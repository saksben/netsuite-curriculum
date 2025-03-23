/**
 * Lesson 2: Checking Object Types with isObject
Objective: Use util.isObject to verify if a variable is an object.

Explanation: util.isObject returns true if the input is a plain object (not an array, function, or primitive), and false otherwise. This is useful for validating data structures before processing, ensuring type safety in dynamic scripts. It’s a simple but powerful type-checking tool.

Deployment/Viewing Instructions:

Save as util2_isobject.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log for type check results.
Hands-On Coding Challenge:
Check if a Sales Order’s custom field is an object and log the result.
 */

define(['N/util', 'N/log', 'N/record'], function(util, log, record) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });
        var customFieldValue = salesOrder.getValue('custbody_custom_data'); // Replace with a valid custom field ID

        var isObj = util.isObject(customFieldValue);
        log.debug({
            title: 'Type Check',
            details: 'custbody_custom_data is object? ' + isObj + 
                     ', Value: ' + JSON.stringify(customFieldValue)
        });
        scriptContext.response.write('Type check completed. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});