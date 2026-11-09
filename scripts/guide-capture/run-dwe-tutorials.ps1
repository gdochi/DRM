param([switch]$Launch,[string]$RunTag='01',[string]$Views='')
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$docsRoot=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../..'))
$taskRoot=Join-Path $docsRoot 'build/task/dwe-tutorials-20261109'
$run=Join-Path $taskRoot ('run-'+$RunTag)
$game=Join-Path $run 'game'
$output=Join-Path $run 'capture'
$classes=Join-Path $run 'classes'
$mods=Join-Path $game 'mods'
New-Item -ItemType Directory -Path $mods,$classes,$output -Force | Out-Null
$prism='C:/Users/hodu3/AppData/Roaming/PrismLauncher'
$lib=Join-Path $prism 'libraries'
$version='21.1.259'
$metadata=Get-Content -LiteralPath (Join-Path $prism ('meta/net.neoforged/'+$version+'.json')) -Raw | ConvertFrom-Json
$mc=Get-Content -LiteralPath (Join-Path $prism 'meta/net.minecraft/1.21.1.json') -Raw | ConvertFrom-Json
$lwjgl=Get-Content -LiteralPath (Join-Path $prism 'meta/org.lwjgl3/3.3.3.json') -Raw | ConvertFrom-Json
$map=@{}
foreach($entry in @($mc.libraries)+@($lwjgl.libraries)+@($metadata.libraries)){
    if($entry.rules){$allow=$false;foreach($rule in $entry.rules){if(!$rule.os -or (!$rule.os.name -or $rule.os.name -eq 'windows') -and (!$rule.os.arch -or $rule.os.arch -in @('amd64','x86_64'))){$allow=$rule.action -eq 'allow'}};if(!$allow){continue}}
    $p=$entry.name.Split(':');if($p.Length -gt 3 -and $p[3] -like '*natives*' -and $p[3] -ne 'natives-windows'){continue}
    $name=$p[1]+'-'+$p[2];if($p.Length -gt 3){$name+='-'+$p[3]}
    $file=Join-Path $lib ($p[0].Replace('.','/')+'/'+$p[1]+'/'+$p[2]+'/'+$name+'.jar')
    if(!(Test-Path -LiteralPath $file)){throw ('Missing installed library '+$file)}
    $map[$p[0]+':'+$p[1]+':'+$p[3]]=$file
}
$cp=@($map.Values)+@((Join-Path $lib 'net/minecraft/client/1.21.1-20240808.144430/client-1.21.1-20240808.144430-extra.jar'))
$neoClient=Join-Path $lib ('net/neoforged/neoforge/'+$version+'/neoforge-'+$version+'-client.jar')
$installer=Join-Path $lib ('net/neoforged/neoforge/'+$version+'/neoforge-'+$version+'-installer.jar')
$zip=[IO.Compression.ZipFile]::OpenRead($installer)
$reader=[IO.StreamReader]::new($zip.GetEntry('version.json').Open())
try{$launchSpec=$reader.ReadToEnd() | ConvertFrom-Json}finally{$reader.Dispose();$zip.Dispose()}
$sources=@('C:/Users/hodu3/Desktop/[COMMON] DRM/jar/dochi_rpg_maker-0.3.2-neoforge-1.21.1.jar','C:/Users/hodu3/Desktop/[COMMON] Dochi`s Npc Core/jar/dochi_npc_core-0.1.4-neoforge-1.21.1.jar','C:/Users/hodu3/Desktop/[COMMON] Dochi`s Warfare/jar/dochi_warfare-0.3.2-neoforge-1.21.1.jar','C:/Users/hodu3/Desktop/[COMMON] Dochi`s Warfare Expanded/jar/dochi_warfare_expanded-0.3.2-neoforge-1.21.1.jar')
$installed=Join-Path $prism 'instances/1.21.1(2)/minecraft/mods'
foreach($name in @('geckolib-neoforge-1.21.1-4.9.2.jar','architectury-13.0.11-neoforge.jar','tacz-neoforge-1.21.1-1.2.0.jar','player-animation-lib-forge-2.0.4+1.21.1.jar','superbwarfare-0.8.9.1-mc1.21.1-133758c1.jar','curios-neoforge-9.5.1+1.21.1.jar','kotlinforforge-5.12.0-all.jar')){$sources+=Join-Path $installed $name}
$inputs=@()
foreach($source in $sources){if(!(Test-Path -LiteralPath $source)){throw ('Missing production mod '+$source)};Copy-Item -LiteralPath $source -Destination $mods -Force;$inputs+=@{source=$source;sha256=(Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash}}
$namedRuntime='C:/Users/hodu3/.gradle/caches/neoformruntime/intermediate_results/compiledWithNeoForge_22ac58f291b70bb5bc9c94bac0384149fe7de250_output.jar'
$compileCp=(@($namedRuntime)+$cp+$sources) -join ';'
$javac='C:/Program Files/Java/jdk-21/bin/javac.exe'
$javaSources=@('GuideCapture.java','GuideScenes.java','GuideTutorials.java','GuideDwe.java') | ForEach-Object{Join-Path $PSScriptRoot $_}
$compileArgs=@('-encoding','UTF-8','-proc:none','--release','21','-cp',$compileCp,'-d',$classes)+$javaSources
$compileFile=Join-Path $run 'compile.args'
[IO.File]::WriteAllLines($compileFile,@($compileArgs | ForEach-Object{'"'+$_.Replace('\','/').Replace('"','\"')+'"'}),[Text.UTF8Encoding]::new($false))
& $javac ('@'+$compileFile) 2>&1 | Out-File -LiteralPath (Join-Path $run 'compile.log') -Encoding utf8
if($LASTEXITCODE -ne 0){Get-Content -LiteralPath (Join-Path $run 'compile.log') -Tail 35;throw 'Capture compilation failed'}
$meta=Join-Path $classes 'META-INF';New-Item -ItemType Directory -Path $meta -Force | Out-Null
[IO.File]::WriteAllText((Join-Path $meta 'neoforge.mods.toml'),"modLoader=`"javafml`"`nloaderVersion=`"[4,)`"`nlicense=`"All Rights Reserved`"`n[[mods]]`nmodId=`"dochi_docs_capture`"`nversion=`"1.0.0`"`ndisplayName=`"Dochi documentation capture`"`n")
$captureJar=Join-Path $mods 'dochi-docs-capture.jar'
if(Test-Path -LiteralPath $captureJar){Remove-Item -LiteralPath $captureJar -Force}
[IO.Compression.ZipFile]::CreateFromDirectory($classes,$captureJar)
$inputs+=@{source='documentation capture fixture';sha256=(Get-FileHash -LiteralPath $captureJar -Algorithm SHA256).Hash}
@{minecraft='1.21.1';loader=('NeoForge '+$version);locale='en_us';actor='dnpc';mods=$inputs} | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $output 'environment.json') -Encoding utf8
[IO.File]::WriteAllLines((Join-Path $game 'options.txt'),@('onboardAccessibility:false','pauseOnLostFocus:false','lang:en_us','guiScale:2','renderDistance:4','simulationDistance:5','tutorialStep:none','maxFps:40','soundCategory_master:0.0'))
$config=Join-Path $game 'config';New-Item -ItemType Directory -Path $config -Force | Out-Null
[IO.File]::WriteAllText((Join-Path $config 'tacz-client.toml'),"[render]`nEnableStaticItemGunVbo = false`nEnableExperimentalDisplayGunVbo = false`n")
$jvm=@('-Xmx3G','-XX:ActiveProcessorCount=4','-Djava.awt.headless=true','-Dfml.earlyprogresswindow=false',('-Ddochi.docs.output='+$output),('-Ddochi.docs.plan='+(Join-Path $PSScriptRoot 'dwe-tutorials.json')),'-Ddochi.docs.timeoutSeconds=1400')
if($Views){$jvm+=('-Ddochi.docs.views='+$Views)}
$jvm+=@($launchSpec.arguments.jvm | ForEach-Object{$_.Replace('${library_directory}',$lib.Replace('\','/')).Replace('${classpath_separator}',';').Replace('${version_name}','1.21.1')})
$jvm+=@(('-DlegacyClassPath='+($cp -join ';')),'-cp',($cp -join ';'),$launchSpec.mainClass,'--username','DochiGuide','--version','1.21.1','--gameDir',$game,'--assetsDir',(Join-Path $prism 'assets'),'--assetIndex','17','--uuid','00000000000000000000000000000002','--accessToken','0','--userType','legacy','--versionType','release','--launchTarget','forgeclient','--width','1920','--height','1080','--fml.neoForgeVersion',$version,'--fml.fmlVersion','4.0.42','--fml.mcVersion','1.21.1','--fml.neoFormVersion','20240808.144430')
$argsFile=Join-Path $run 'launch.args'
[IO.File]::WriteAllLines($argsFile,@($jvm | ForEach-Object{'"'+$_.Replace('\','/').Replace('"','\"')+'"'}),[Text.UTF8Encoding]::new($false))
if(!$Launch){Write-Output ('Prepared '+$run);return}
$others=@(Get-CimInstance Win32_Process | Where-Object {$_.Name -match '^javaw?\.exe$' -and $_.ExecutablePath -notlike '*\KTSpeedClient\*'})
if($others.Count -gt 0){throw ('Existing Java processes requiring inspection: '+($others.ProcessId -join ', '))}
$start=[Diagnostics.ProcessStartInfo]::new('C:/Program Files/Java/jdk-21/bin/java.exe')
$start.ArgumentList.Add('@'+$argsFile);$start.WorkingDirectory=$game;$start.UseShellExecute=$false;$start.CreateNoWindow=$true;$start.WindowStyle='Hidden';$start.RedirectStandardOutput=$true;$start.RedirectStandardError=$true
$proc=[Diagnostics.Process]::Start($start)
@{pid=$proc.Id;game=$game;capture=$output;started=(Get-Date).ToString('o');heap='3G';instances=1} | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $run 'process.json') -Encoding utf8
Write-Output ('Started owned capture PID '+$proc.Id+' in '+$run)
$stdout=[IO.File]::Open((Join-Path $run 'client.log'),'Create','Write','ReadWrite');$stderr=[IO.File]::Open((Join-Path $run 'client-error.log'),'Create','Write','ReadWrite')
try{$outTask=$proc.StandardOutput.BaseStream.CopyToAsync($stdout);$errTask=$proc.StandardError.BaseStream.CopyToAsync($stderr);$proc.WaitForExit();$outTask.GetAwaiter().GetResult();$errTask.GetAwaiter().GetResult()}finally{$stdout.Dispose();$stderr.Dispose()}
Write-Output ('Capture exited '+$proc.ExitCode)
