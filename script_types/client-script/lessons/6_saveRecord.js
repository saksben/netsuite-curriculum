/**
 * Lesson 6.1: Pre-Save Validation with saveRecord
Objective: Use saveRecord to validate the record before saving.

Explanation: saveRecord runs before submission, returning true to save or false to block with an alert. It enforces record-wide rules.

Deployment/Viewing Instructions: Same as Lesson 1.1; save without a Customer, check for an alert.

Hands-On Coding Challenge:

Block save if Customer is missing.
 */

define(['N/currentRecord', 'N/ui/message'], function(currentRecord, message) {
    function saveRecord(scriptContext) {
        var rec = currentRecord.get();
        if (!rec.getValue('entity')) {
            message.create({
                title: 'Save Error',
                message: 'Customer is required.',
                type: message.Type.ERROR
            }).show();
            return false;
        }
        return true;
    }
    return { saveRecord: saveRecord };
});