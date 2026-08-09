@echo off
setlocal
cd /d "%~dp0"

echo.
echo DRM Docs publish
echo =================
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo [ERROR] git command was not found.
  goto fail
)

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] node command was not found.
  goto fail
)

echo [1/4] Building site...
call npm.cmd run build
if errorlevel 1 goto fail

echo.
echo [2/4] Staging changes...
git add -A
if errorlevel 1 goto fail

git diff --cached --quiet
if errorlevel 2 goto fail
if errorlevel 1 goto commit

echo No file changes to commit.
goto push

:commit
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HH-mm"') do set DOCS_TS=%%i
echo.
echo [3/4] Creating commit...
git commit -m "docs: update wiki %DOCS_TS%"
if errorlevel 1 goto fail

:push
echo.
echo [4/4] Pushing to GitHub...
git push origin docs-pages
if errorlevel 1 goto fail

echo.
echo Done. GitHub Pages will update after the Actions deploy finishes.
echo https://gdochi.github.io/DRM/
echo.
pause
exit /b 0

:fail
echo.
echo Publish failed. Check the message above.
echo.
pause
exit /b 1
