/**
 * Lesson 5.1: Validating Line Entries with validateLine
Objective: Use validateLine to check sublist lines before commit.

Explanation: validateLine runs when a line is committed (e.g., clicking “Add”), returning true to accept or false to reject. It ensures line-level rules.

Deployment/Viewing Instructions: Same as Lesson 1.1; add an item line with Quantity < 1, check for an alert.

Hands-On Coding Challenge:

Reject item lines with Quantity less than 1.
 */

define(['N/currentRecord', 'N/ui/message'], function(currentRecord, message) {
    function validateLine(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item') {
            var qty = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });
            if (!qty || qty < 1) {
                message.create({
                    title: 'Invalid Quantity',
                    message: 'Quantity must be at least 1.',
                    type: message.Type.ERROR
                }).show();
                return false;
            }
        }
        return true;
    }
    return { validateLine: validateLine };
});