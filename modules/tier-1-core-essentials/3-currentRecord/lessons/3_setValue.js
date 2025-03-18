/**
 * Lesson 3: Updating Fields with setValue
Objective: Modify field values on the current record using setValue.

Explanation: setValue updates a field’s value in real-time (e.g., during fieldChanged or saveRecord). It takes fieldId and value parameters, and optionally options like ignoreFieldChange to prevent recursive triggers. This lets you dynamically alter the UI.

Deployment/Viewing Instructions:

Save as cr3_setvalue.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing.
Edit a Sales Order, change the customer, and observe the Memo field update in the UI (and check the console).
Hands-On Coding Challenge:
Set the Memo field when the customer changes.
 */

define(['N/currentRecord'], function(currentRecord) {
    function fieldChanged(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.fieldId === 'entity') {
            var customerId = rec.getValue('entity');
            rec.setValue({
                fieldId: 'memo',
                value: 'Customer set to ID: ' + customerId
            });
            console.log('Memo updated for Customer ID: ' + customerId);
        }
    }
    return {
        fieldChanged: fieldChanged
    };
});