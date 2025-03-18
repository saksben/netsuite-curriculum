/**
 * Lesson 9.1: Validating Line Deletions with validateDelete
Objective: Use validateDelete to restrict sublist line removals.

Explanation: validateDelete runs before a line is deleted, returning true to allow or false to block. It protects critical lines.

Deployment/Viewing Instructions: Same as Lesson 1.1; try deleting an item line with Quantity > 10, check for an alert.

Hands-On Coding Challenge:

Prevent deletion of item lines with Quantity over 10.
 */

define(['N/currentRecord', 'N/ui/message'], function(currentRecord, message) {
    function validateDelete(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item') {
            var qty = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });
            if (qty > 10) {
                message.create({
                    title: 'Deletion Blocked',
                    message: 'Cannot delete lines with quantity over 10.',
                    type: message.Type.ERROR
                }).show();
                return false;
            }
        }
        return true;
    }
    return { validateDelete: validateDelete };
});