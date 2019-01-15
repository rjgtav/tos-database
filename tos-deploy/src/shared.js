const
    fs = require('fs'),
    path = require('path')
;

exports.IS_PROD = process.argv.length >= 3 && process.argv[2].indexOf('prod') > -1;
exports.REGIONS = ['iTOS', 'jTOS', 'kTOS', 'kTEST'];

//======================================================================================================================
// Methods
//======================================================================================================================

function singletonPID() {
    return path.basename(__filename).replace('.js', '.pid');
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

exports.slackError = function(error) {
    throw error; // TODO: explode and tell slack
};
