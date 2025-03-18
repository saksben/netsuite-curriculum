/**
 * Lesson 3: Handling Errors with try-catch and Properties
Objective: Use try-catch to handle a custom error and access its properties (name, message, id).

Explanation: Combining throw with try-catch allows you to gracefully handle errors created by error.create. The error object’s properties (name, message, id) provide context for logging or user feedback. This ensures scripts remain robust even when errors occur.

Deployment/Viewing Instructions:

Save as err3_handling.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log for error handling results.
Hands-On Coding Challenge:
Catch and log a custom error for a missing Sales Order field.
 */

define(['N/error', 'N/log', 'N/record'], function(error, log, record) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        try {
            var salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id: salesOrderId
            });
            var customer = salesOrder.getValue('entity');
            if (!customer) {
                throw error.create({
                    name: 'SSS_MISSING_CUSTOMER',
                    message: 'Sales Order ' + salesOrderId + ' is missing a customer.',
                    id: 'SO_' + salesOrderId
                });
            }
            log.debug({
                title: 'Validation Passed',
                details: 'Customer found: ' + customer
            });
        } catch (e) {
            log.error({
                title: 'Error Caught',
                details: 'Name: ' + e.name + ', Message: ' + e.message + ', ID: ' + e.id
            });
        }
        scriptContext.response.write('Error handling complete. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});