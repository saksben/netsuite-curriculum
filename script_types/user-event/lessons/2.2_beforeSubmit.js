/**
 * Lesson 2.2: Updating Fields with beforeSubmit
Objective: Use beforeSubmit to update a field based on conditions before saving.

Explanation: Expands on beforeSubmit by modifying fields instead of just validating. This lesson sets a custom status field based on the total, showcasing dynamic updates.

Deployment/Viewing Instructions:

Save as ue_beforesubmit_update.js in the File Cabinet.
Deploy to Sales Order (same as Lesson 1.1).
Save a Sales Order with a total above 1000, check the custom field (custbody_status), and verify the Execution Log.
Hands-On Coding Challenge:
Set a custom status to “High Value” if the total exceeds 1000.
 */

define(['N/log'], function(log) {
    function beforeSubmit(scriptContext) {
        var newRecord = scriptContext.newRecord;
        var total = newRecord.getValue('total');
        var status = total > 1000 ? 'High Value' : 'Standard';
        newRecord.setValue({
            fieldId: 'custbody_status', // Replace with a valid custom field ID
            value: status
        });
        log.debug({
            title: 'Before Submit Update',
            details: 'Set status to ' + status + ' for Sales Order ID: ' + newRecord.id
        });
    }
    return { beforeSubmit: beforeSubmit };
});