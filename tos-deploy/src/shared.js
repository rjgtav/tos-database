const fs = require('fs');
const path = require('path');
const request = require('sync-request');
const sharedVariables = require("./shared-variables");

exports.IS_FORCE_DEPLOY = process.argv.length > 2 && !!process.argv.find(value => value === 'deploy');
exports.IS_PROD = process.argv.length > 2 && !!process.argv.find(value => value === 'prod');
exports.REGIONS = ['iTOS', 'jTOS', 'kTOS', 'kTEST', 'twTOS'];

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
        let pid = +fs.readFileSync(scriptPID, { encoding: 'utf8' });

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

exports.log = function(message) {
    message = (Array.isArray(message) ? message : [message]);

    if (exports.IS_PROD)
        request('POST', sharedVariables.SLACK_WEBHOOK, { json: {
                attachments: [{
                    color: 'good',
                    fallback: message.join(' '),
                    fields: [{
                        title: message.join(' '),
                        short: false
                    }]
                }]
            }});

    console.log(...message);
};
exports.logError = function(message) {
    message = (Array.isArray(message) ? message : [message]);

    let getStackTrace = function() {
        let obj = {};
        Error.captureStackTrace(obj, getStackTrace);
        return obj.stack;
    };

    if (exports.IS_PROD)
        request('POST', sharedVariables.SLACK_WEBHOOK_ERROR, { json: {
            attachments: [{
                color: 'danger',
                fallback: message.join(' '),
                fields: [{
                    title: message[0],
                    value: getStackTrace(),
                    short: false
                }]
            }]
        }});

    console.trace(...message);
    process.exit(1);
};
