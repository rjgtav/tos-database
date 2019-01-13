Param(
    [Parameter(Mandatory=$True)]
    [ValidateSet("DEV","PROD")]
    [String]
    $Environment = "DEV"
)

$ErrorActionPreference = "Stop"                                 # Stop script execution in case of error
New-Item -ItemType Directory -Force -Path "logs" | Out-Null     # Create logs folder

# Adapted from https://stackoverflow.com/a/38738942
Function Write-Log {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory=$True)]
        [string]
        $Message,

        [Parameter(Mandatory=$False)]
        [ValidateSet("INFO","WARN","ERROR","FATAL","DEBUG")]
        [String]
        $Level = "INFO"
    )

    $Stamp = (Get-Date).toString("yyyy/MM/dd HH:mm:ss")
    $Line = "$Stamp $Level $Message"


    $logfile = "logs/" + (Get-Date).toString("yyyy-MM-dd") + ".log"

    Add-Content $logfile -Value $Line
    Write-Output $Line
}

Write-Log "+====================================================+"
Write-Log "| Patching tos.guru...                               |"
Write-Log "+====================================================+"

if ($Environment -eq 'DEV') {
    $INSTALL = @{
        'iTOS' = "C:\Games\steamapps\common\TreeOfSavior";
        'jTOS' = "C:\Games\TreeofSaviorJP";
        'kTOS' = "C:\Games\TreeOfSavior";
        'kTEST' = "C:\Games\TreeOfSavior Test";
    }
} else {
    $INSTALL = @{
        'iTOS' = "C:\tos.guru\game\iTOS";
        'jTOS' = "C:\tos.guru\game\jTOS";
        'kTOS' = "C:\tos.guru\game\kTOS";
        'kTEST' = "C:\tos.guru\game\kTEST";
    }
}

$REGIONS = @('iTOS', 'jTOS', 'kTOS', 'kTEST')

foreach ($region in $REGIONS) {
    Write-Log "[$($region)] Patching..."
}


#$deploy = $false
#
#$paths = @{}
#$paths['iTOS'] = "C:\Games\steamapps\common\TreeOfSavior"
#$paths['jTOS'] = "C:\Games\TreeofSaviorJP"
#$paths['kTOS'] = "C:\Games\TreeOfSavior"
#$paths['kTEST'] = "C:\Games\TreeOfSavior Test"
#
#$processes = @("*Client_tos.exe", "*Steam.exe")
#
## 1. Stash pending changes
#bash -c "git add --all"
#bash -c "git stash"
#
#foreach ($region in $paths.keys) {
#    $date = Get-Date -UFormat "+%Y-%m-%d"
#    $path = $paths[$region]
#
#    # 2. Kill problematic processes (e.g. TOS Client, Steam) (if running)
#    foreach ($process in $processes) {
#        $process = Get-Process | Where-Object {$_.Path -like $process}
#        if ($process) {
#            $process.Kill()
#        }
#    }
#
#    # 3. Patch the game
#	$exe = $path + "\release\patch\tos.exe"
#    Write-Host "[$( $region )] Patching..."
#    & $exe | Out-Null
#
#    # 4. Kill problematic processes (e.g. TOS Client, Steam) (if running)
#    foreach ($process in $processes) {
#        $process = Get-Process | Where-Object {$_.Path -like $process}
#        if ($process) {
#            $process.Kill()
#        }
#    }
#
#    # 5. Run parser
#    Write-Host "[$( $region )] Parsing..."
#    bash -c "python ../IPFParser/src/main.py $( $region )"
#
#    # 6. Commit new changes (if available)
#    if (git status --porcelain) {
#        # 6.1. Run indexer
#        Write-Host "[$( $region )] Indexing..."
#        bash -c "pushd ../tos-search && node src/index.js $( $region ) && popd"
#
#        # 6.2. Run sitemapper
#        Write-Host "[$( $region )] Sitemapping..."
#        bash -c "pushd ../tos-sitemap && node src/index.js $( $region ) && popd"
#
#        Write-Host "[$( $region )] Commiting..."
#        bash -c "git add --all"
#        bash -c "git commit -m \""[$( $region )] Updated database as of $( $date )\"""
#        bash -c "git push"
#
#        $deploy = $true
#    }
#}
#
## 7. Deploy the updated database
#if ($deploy) {
#    Write-Host "Deploying..."
#    bash -c "./deploy.sh \""Updated database as of $( $date )\"""
#}
#
## 8. Pop pending changes
#bash -c "git stash pop"