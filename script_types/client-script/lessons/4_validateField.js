/**
 * Lesson 4.1: Validating Field Input with validateField
Objective: Use validateField to enforce field rules.

Explanation: validateField runs before a field value is committed, returning true to accept or false to reject with an alert. It ensures immediate validation.

Deployment/Viewing Instructions: Same as Lesson 1.1; edit Order Date, check for an alert.

Hands-On Coding Challenge:

Reject future Order Dates.
 */

define(['N/currentRecord', 'N/ui/message'], function(currentRecord, message) {
    function validateField(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.fieldId === 'trandate') {
            var orderDate = new Date(rec.getValue('trandate'));
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            if (orderDate > today) {
                message.create({
                    title: 'Invalid Date',
                    message: 'Order Date cannot be in the future.',
                    type: message.Type.WARNING
                }).show();
                return false;
            }
        }
        return true;
    }
    return { validateField: validateField };
});