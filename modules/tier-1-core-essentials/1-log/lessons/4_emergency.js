/**
 * Lesson 4: Handling Critical Issues with log.emergency
Objective: Use log.emergency to log critical, system-level issues that require immediate attention.

Explanation: log.emergency is the highest severity level, reserved for critical failures (e.g., system outages, data corruption risks). It’s visible at EMERGENCY log level or higher and is rare in everyday scripting but vital for escalation. It uses title and details like other methods.

Deployment/Viewing Instructions:

Save as log4_emergency.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing and Log Level: EMERGENCY (or higher, like DEBUG).
Save a Sales Order and check the Execution Log for the emergency log.
Hands-On Coding Challenge:
Log an emergency if a Sales Order’s subtotal is negative (an unlikely but critical scenario).
 */

define(['N/log'], function(log) {
    function beforeSubmit(scriptContext) {
        var subtotal = scriptContext.newRecord.getValue('subtotal');
        if (subtotal < 0) {
            log.emergency({
                title: 'Negative Subtotal Detected',
                details: 'Subtotal is ' + subtotal + '. This should not happen!'
            });
        }
    }
    return {
        beforeSubmit: beforeSubmit
    };
});