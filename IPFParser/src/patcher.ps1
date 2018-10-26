$deploy = $false

$paths = @{}
$paths['iTOS'] = "C:\Games\steamapps\common\TreeOfSavior"
$paths['jTOS'] = "C:\Games\TreeofSaviorJP"
$paths['kTOS'] = "C:\Games\TreeOfSavior"
$paths['kTEST'] = "C:\Games\TreeOfSavior Test"

$processes = @("*Client_tos.exe", "*Steam.exe")

# 1. Stash pending changes
bash -c @'git add --all'@
bash -c @'git stash'@

foreach ($region in $paths.keys) {
    $date = Get-Date -UFormat "+%Y-%m-%d"
    $path = $paths[$region]

    # 2. Problematic processes (e.g. TOS Client, Steam) (if running)
    for ($process in $processes) {
        $process = Get-Process | Where-Object {$_.Path -like $process}
        if ($process) {
            $process.Kill()
        }
    }

    # 3. Patch the game
	$exe = $path + "\release\patch\tos.exe"
    Write-Host "[$( $region )] Patching..."
    & $exe | Out-Null

    # 4. Run parser
    Write-Host "[$( $region )] Parsing..."
    bash -c @'python src/main.py $( $region )'@

    # 5. Commit new changes (if available)
    if (git status --porcelain) {
        Write-Host "[$( $region )] Commiting..."
        bash -c @'git add --all'@
        bash -c @'git commit -m "[$( $region )] Updated database as of $( $date )"'@
        bash -c @'git push'@

        $deploy = $true
    }
}

# 6. Deploy the updated database
if ($deploy) {
    Write-Host "Deploying..."
    bash -c @'../web/deploy-gh-pages.sh "Updated database as of $( $date )"'@
}

# 7. Pop pending changes
bash -c @'git stash pop'@