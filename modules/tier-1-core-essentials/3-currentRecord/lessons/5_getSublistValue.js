/**
 * Lesson 5: Reading Sublist Data with getSublistValue
Objective: Retrieve sublist field values using getSublistValue.

Explanation: getSublistValue accesses data from sublists (e.g., the item sublist on a Sales Order). It requires sublistId, fieldId, and line (index starting at 0). This is essential for working with line items in real-time.

Deployment/Viewing Instructions:

Save as cr5_getsublistvalue.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing.
Load a Sales Order with items and check the console for the first line’s details.
Hands-On Coding Challenge:
Log the item and quantity of the first line when the page loads.
 */

define(['N/currentRecord'], function(currentRecord) {
    function pageInit(scriptContext) {
        var rec = currentRecord.get();
        var itemId = rec.getSublistValue({
            sublistId: 'item',
            fieldId: 'item',
            line: 0
        });
        var quantity = rec.getSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
            line: 0
        });
        console.log('First Line - Item ID: ' + itemId + ', Quantity: ' + quantity);
    }
    return {
        pageInit: pageInit
    };
});