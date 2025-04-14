/**
 * Lesson 1: Iterating Collections with each
Objective: Learn to iterate over arrays or objects using util.each.

Explanation: util.each loops through an array or object, calling a callback function for each element with parameters value and index (or key for objects). Returning false from the callback stops iteration early. This is a cleaner alternative to native for loops, especially for dynamic data like search results.
Util lets you manually access methods that verify object and primitive types in a SuiteScript 2.x script

Deployment/Viewing Instructions:

Save the script file (e.g., util1_each.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script record (Customization > Scripting > Scripts > New), set Script Type to Suitelet, and link your file.
Deploy it (Customization > Scripting > Script Deployments), set Status to Released, and note the External URL.
Open the URL, then check the Execution Log for iteration results.
Hands-On Coding Challenge:
Iterate over a Sales Order’s line items and log their quantities.
 */

define(['N/util', 'N/log', 'N/record'], function(util, log, record) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });
        var lineCount = salesOrder.getLineCount({ sublistId: 'item' });
        var quantities = [];

        util.each(Array.from({ length: lineCount }), function(index) {
            var qty = salesOrder.getSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: index
            });
            quantities.push(qty);
        });

        log.debug({
            title: 'Line Quantities',
            details: 'Quantities: ' + quantities.join(', ')
        });
        scriptContext.response.write('Line items processed. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});