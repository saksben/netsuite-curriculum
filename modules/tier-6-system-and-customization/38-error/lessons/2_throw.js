/**
 * Lesson 2: Throwing an Error with throw
Objective: Use throw to raise a custom error and halt execution.

Explanation: After creating an error with error.create, you can throw it to stop script execution and propagate the error up the call stack. This is useful for enforcing conditions (e.g., validation) and triggering error handling (e.g., try-catch). Thrown errors appear in the Execution Log or UI if uncaught.

Deployment/Viewing Instructions:

Save as err2_throw.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log for the thrown error (execution will stop after the throw).
Hands-On Coding Challenge:
Throw an error if a Sales Order total is negative.
 */

define(['N/error', 'N/log', 'N/record'], function(error, log, record) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });
        var total = salesOrder.getValue('total');

        if (total < 0) {
            var negTotalError = error.create({
                name: 'SSS_NEGATIVE_TOTAL',
                message: 'Sales Order total cannot be negative: ' + total,
                id: 'SO_' + salesOrderId
            });
            throw negTotalError;
        }
        log.debug({
            title: 'Sales Order Check',
            details: 'Total is valid: ' + total
        });
        scriptContext.response.write('Check completed. See logs.');
    }
    return {
        onRequest: onRequest
    };
});