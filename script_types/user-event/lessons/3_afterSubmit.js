/**
 * Lesson 3.1: Post-Processing with afterSubmit
Objective: Use afterSubmit to log Sales Order details or trigger additional actions after saving.

Explanation: The afterSubmit entry point runs after the record is saved, receiving scriptContext with newRecord, oldRecord, and type. It’s suited for logging, notifications, or follow-up tasks. This lesson logs the saved total and customer.

Deployment/Viewing Instructions:

Save as ue_aftersubmit.js in the File Cabinet.
Deploy to Sales Order (same as Lesson 1.1).
Save a Sales Order, check the Execution Log for details.
Hands-On Coding Challenge:
Log the total and customer after saving.
 */

define(['N/log'], function(log) {
    function afterSubmit(scriptContext) {
        var newRecord = scriptContext.newRecord;
        log.audit({
            title: 'After Submit',
            details: 'Sales Order ID: ' + newRecord.id + 
                     ', Total: ' + newRecord.getValue('total') + 
                     ', Customer: ' + newRecord.getText('entity')
        });
    }
    return { afterSubmit: afterSubmit };
});