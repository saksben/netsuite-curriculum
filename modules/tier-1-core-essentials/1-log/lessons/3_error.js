/**
 * Lesson 3: Reporting Issues with log.error
Objective: Log errors or exceptions using log.error to highlight problems.

Explanation: log.error is for logging issues that need attention (e.g., validation failures, exceptions). It’s visible at the ERROR log level or higher and stands out in the Execution Log with a red indicator. Use it to debug failures or alert admins. It also supports title and details, and you can pass objects for richer data.

Deployment/Viewing Instructions:

Save as log3_error.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing and Log Level: ERROR (or higher).
Trigger by saving a Sales Order, then view the Execution Log for the error entry.
Hands-On Coding Challenge:
Log an error if a Sales Order has no customer selected.
 */

define(['N/log'], function(log) {
    function beforeSubmit(scriptContext) {
        var customer = scriptContext.newRecord.getValue('entity');
        if (!customer) {
            log.error({
                title: 'Missing Customer',
                details: 'No customer selected on this Sales Order.'
            });
        }
    }
    return {
        beforeSubmit: beforeSubmit
    };
});