/**
 * Lesson 7.2: Logging Line Context with lineInit
Objective: Use lineInit to log line details for debugging.

Explanation: Expands on Lesson 7.1 by logging line data, useful for troubleshooting or auditing.

Deployment/Viewing Instructions: Same as Lesson 1.1; click an item line, check the console.

Hands-On Coding Challenge:

Log the item ID and quantity on line initialization.
 */

define(['N/currentRecord'], function(currentRecord) {
    function lineInit(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item') {
            var itemId = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item'
            });
            var qty = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });
            console.log('Line initialized - Item ID: ' + itemId + ', Quantity: ' + qty);
        }
    }
    return { lineInit: lineInit };
});