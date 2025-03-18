/**
 * Lesson 6: Modifying Sublists with setSublistValue
Objective: Update sublist field values using setSublistValue.

Explanation: setSublistValue modifies sublist fields in real-time, taking sublistId, fieldId, line, and value. It’s powerful for dynamic line-item updates, like adjusting quantities or descriptions based on user input.

Deployment/Viewing Instructions:

Save as cr6_setsublistvalue.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing.
Edit a Sales Order, change a quantity, and see the description update (check console too).
Hands-On Coding Challenge:
Update the first line’s description when its quantity changes.
 */

define(['N/currentRecord'], function(currentRecord) {
    function fieldChanged(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item' && scriptContext.fieldId === 'quantity') {
            var line = scriptContext.line;
            var quantity = rec.getSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: line
            });
            rec.setSublistValue({
                sublistId: 'item',
                fieldId: 'description',
                line: line,
                value: 'Qty updated to ' + quantity
            });
            console.log('Line ' + line + ' description updated');
        }
    }
    return {
        fieldChanged: fieldChanged
    };
});