/**
 * Lesson 2.2: Dynamic Updates with fieldChanged
Objective: Update a dependent field using fieldChanged.

Explanation: Builds on Lesson 2.1 by modifying fields dynamically, enhancing interactivity.

Deployment/Viewing Instructions: Same as Lesson 1.1; change Quantity on an item line, check Description.

Hands-On Coding Challenge:

Update Description based on Quantity.
 */

define(['N/currentRecord'], function(currentRecord) {
    function fieldChanged(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item' && scriptContext.fieldId === 'quantity') {
            var qty = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: scriptContext.line
            });
            rec.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'description',
                value: 'Qty: ' + qty,
                line: scriptContext.line
            });
        }
    }
    return { fieldChanged: fieldChanged };
});