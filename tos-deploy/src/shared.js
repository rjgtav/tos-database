const
    fs = require('fs'),
    path = require('path')
;

exports.IS_FORCE_DEPLOY = process.argv.length > 2 && !!process.argv.find(value => value === 'deploy');
exports.IS_PROD = process.argv.length > 2 && !!process.argv.find(value => value === 'prod');
exports.REGIONS = ['iTOS', 'jTOS', 'kTOS', 'kTEST'];

//======================================================================================================================
// Methods
//======================================================================================================================

function singletonPID() {
    return path.basename(process.argv[1]).replace('.js', '.pid');
}
function singletonPIDExists(pid) {
    try {
        process.kill(pid, 0);
        return true;
    } catch (e) {}

    return false;
}

exports.singletonLock = function(aggressive) {
    let scriptPID = singletonPID();

    // Check if a previous instance is still running
    if (fs.existsSync(scriptPID)) {
        let pid = +fs.readFileSync(scriptPID);

        if (singletonPIDExists(pid)) {
            if (aggressive) { // Kill previous instance
                console.log('Killing previous instance. PID:', pid);
                process.kill(+pid, 'SIGKILL');
            } else { // Kill ourselves
                console.error('An existing instance is already running. PID:', pid, 'Aborting...');
                process.exit(1);
            }
        }

        fs.unlinkSync(scriptPID);
    }

    // Save new PID
    fs.writeFileSync(scriptPID, process.pid);
};

exports.singletonUnlock = function() {
    fs.unlinkSync(singletonPID());
};

exports.slackError = function(message) {
    console.error(...message);
    throw new Error(Array.isArray(message) ? message[0] : message); // TODO: explode and tell slack
};
