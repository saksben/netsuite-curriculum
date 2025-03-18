/**
 * Lesson 2.1: Validating Data with beforeSubmit
Objective: Use beforeSubmit to validate Sales Order data before saving.

Explanation: The beforeSubmit entry point runs before the record is saved, receiving scriptContext with newRecord, oldRecord, and type (create/edit/delete). It’s perfect for validation, throwing an error to block submission if conditions fail. This lesson ensures a customer is selected.

Deployment/Viewing Instructions:

Save as ue_beforesubmit_validate.js in the File Cabinet.
Deploy to Sales Order (same as Lesson 1.1).
Attempt to save a Sales Order without a customer, check for the error message, and verify the Execution Log.
Hands-On Coding Challenge:
Block save if the Customer field is empty.
 */

define(['N/error', 'N/log'], function(error, log) {
    function beforeSubmit(scriptContext) {
        var newRecord = scriptContext.newRecord;
        if (!newRecord.getValue('entity')) {
            throw error.create({
                name: 'MISSING_CUSTOMER',
                message: 'Customer is required before saving the Sales Order.'
            });
        }
        log.debug({
            title: 'Before Submit Validation',
            details: 'Validated customer for Sales Order ID: ' + newRecord.id
        });
    }
    return { beforeSubmit: beforeSubmit };
});