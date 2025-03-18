/**
 * Lesson 2.1: Basic Field Change Detection with fieldChanged
Objective: Use fieldChanged to log a field edit.

Explanation: fieldChanged triggers on field edits, providing sublistId, fieldId, line, and currentRecord in scriptContext. It’s great for monitoring changes.

Deployment/Viewing Instructions: Same as Lesson 1.1; edit Customer and check the console.

Hands-On Coding Challenge:

Log the new Customer value.
 */

define(['N/currentRecord'], function(currentRecord) {
    function fieldChanged(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.fieldId === 'entity') {
            console.log('Customer changed to: ' + rec.getValue('entity'));
        }
    }
    return { fieldChanged: fieldChanged };
});