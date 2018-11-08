$deploy = $false

$paths = @{}
$paths['iTOS'] = "C:\Games\steamapps\common\TreeOfSavior"
$paths['jTOS'] = "C:\Games\TreeofSaviorJP"
$paths['kTOS'] = "C:\Games\TreeOfSavior"
$paths['kTEST'] = "C:\Games\TreeOfSavior Test"

$processes = @("*Client_tos.exe", "*Steam.exe")

# 1. Stash pending changes
bash -c "git add --all"
bash -c "git stash"

foreach ($region in $paths.keys) {
    $date = Get-Date -UFormat "+%Y-%m-%d"
    $path = $paths[$region]

    # 2. Kill problematic processes (e.g. TOS Client, Steam) (if running)
    foreach ($process in $processes) {
        $process = Get-Process | Where-Object {$_.Path -like $process}
        if ($process) {
            $process.Kill()
        }
    }

    # 3. Patch the game
	$exe = $path + "\release\patch\tos.exe"
    Write-Host "[$( $region )] Patching..."
    & $exe | Out-Null

    # 4. Kill problematic processes (e.g. TOS Client, Steam) (if running)
    foreach ($process in $processes) {
        $process = Get-Process | Where-Object {$_.Path -like $process}
        if ($process) {
            $process.Kill()
        }
    }

    # 5. Run parser
    Write-Host "[$( $region )] Parsing..."
    bash -c "python ../IPFParser/src/main.py $( $region )"

    # 6. Run indexer
    Write-Host "[$( $region )] Indexing..."
    bash -c "pushd ../tos-search && node index.js $( $region ) && popd"

    # 7. Commit new changes (if available)
    if (git status --porcelain) {
        Write-Host "[$( $region )] Commiting..."
        bash -c "git add --all"
        bash -c "git commit -m \""[$( $region )] Updated database as of $( $date )\"""
        bash -c "git push"

        $deploy = $true
    }
}

# 8. Deploy the updated database
if ($deploy) {
    Write-Host "Deploying..."
    bash -c "./deploy.sh \""Updated database as of $( $date )\"""
}

# 9. Pop pending changes
bash -c "git stash pop"