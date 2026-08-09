$ErrorActionPreference = "Stop"

$docsRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")).Path
$mappingPath = Join-Path $docsRoot "logo-sync.json"
$siteConfigPath = Join-Path $docsRoot "site.config.json"
$logoRoot = Join-Path $docsRoot "_modLogo"

if (-not (Test-Path -LiteralPath $mappingPath -PathType Leaf)) {
    throw "Logo mapping file was not found: $mappingPath"
}

$mappingConfig = Get-Content -Raw -Encoding UTF8 -LiteralPath $mappingPath | ConvertFrom-Json
$siteConfig = Get-Content -Raw -Encoding UTF8 -LiteralPath $siteConfigPath | ConvertFrom-Json
$mappings = @($mappingConfig.mappings)

if ($mappings.Count -eq 0) {
    Write-Host "[LOGO] No logo mappings configured."
    exit 0
}

New-Item -ItemType Directory -Path $logoRoot -Force | Out-Null
$logoRootPrefix = [IO.Path]::GetFullPath($logoRoot).TrimEnd([char[]]"\/") + [IO.Path]::DirectorySeparatorChar
$assetPrefix = "assets/mod-logos/"

foreach ($mapping in $mappings) {
    $wikiModId = [string]$mapping.wikiModId
    $sourceValue = [Environment]::ExpandEnvironmentVariables([string]$mapping.source)

    if ([string]::IsNullOrWhiteSpace($wikiModId) -or [string]::IsNullOrWhiteSpace($sourceValue)) {
        throw "Each logo mapping requires wikiModId and source."
    }

    if (-not [IO.Path]::IsPathRooted($sourceValue)) {
        $sourceValue = Join-Path $docsRoot $sourceValue
    }
    $sourcePath = [IO.Path]::GetFullPath($sourceValue)

    if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf)) {
        throw "Logo source for '$wikiModId' was not found: $sourcePath"
    }

    $matchingMods = @($siteConfig.wikiMods | Where-Object { [string]$_.id -eq $wikiModId })
    if ($matchingMods.Count -ne 1) {
        throw "Expected exactly one wikiMods entry for '$wikiModId', found $($matchingMods.Count)."
    }

    $siteLogoPath = [string]$matchingMods[0].logo
    if (-not $siteLogoPath.StartsWith($assetPrefix, [StringComparison]::OrdinalIgnoreCase)) {
        throw "wikiMods '$wikiModId' logo must be under $assetPrefix"
    }

    $relativeTarget = $siteLogoPath.Substring($assetPrefix.Length).Replace("/", [IO.Path]::DirectorySeparatorChar)
    $destinationPath = [IO.Path]::GetFullPath((Join-Path $logoRoot $relativeTarget))
    if (-not $destinationPath.StartsWith($logoRootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Logo target for '$wikiModId' escapes _modLogo: $siteLogoPath"
    }

    New-Item -ItemType Directory -Path (Split-Path -Parent $destinationPath) -Force | Out-Null
    $sourceHash = (Get-FileHash -LiteralPath $sourcePath -Algorithm SHA256).Hash
    $destinationHash = if (Test-Path -LiteralPath $destinationPath -PathType Leaf) {
        (Get-FileHash -LiteralPath $destinationPath -Algorithm SHA256).Hash
    } else {
        ""
    }

    if ($sourceHash -eq $destinationHash) {
        Write-Host "[LOGO] Unchanged: $wikiModId -> $relativeTarget"
        continue
    }

    Copy-Item -LiteralPath $sourcePath -Destination $destinationPath -Force
    Write-Host "[LOGO] Synced: $wikiModId -> $relativeTarget"
}

Write-Host "[LOGO] Sync complete."
