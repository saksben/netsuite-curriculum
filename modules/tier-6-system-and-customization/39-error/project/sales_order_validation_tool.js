/**
 * Concluding Mini-Project: Sales Order Validation Tool
Objective: Build a Suitelet that uses all N/error sub-subjects (create, throw, properties like name, message, id) to validate a Sales Order and handle errors with a user-friendly interface.

Explanation: This project integrates all N/error methods and properties to create a validation tool that checks a Sales Order for negative totals and missing customers, throwing custom errors and displaying them in a form. It simulates a real-world use case like ensuring data integrity before processing.

Hands-On Coding Challenge:

Create a Suitelet to validate a Sales Order, throwing and catching custom errors.

Deployment/Viewing Instructions:

Save as err_mini_project.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the form for validation status or errors, and the Execution Log for detailed error info.
Next Steps
Expand: Pair N/error with N/email to notify admins of validation failures.
Challenge: Add multiple validation checks (e.g., line items) and throw errors in a loop.
Deep Dive: Explore stack property (if available) for error tracing in complex scripts.
 */

define(['N/error', 'N/log', 'N/record', 'N/ui/serverWidget'], function(error, log, record, serverWidget) {
    function onRequest(scriptContext) {
        var form = serverWidget.createForm({ title: 'Sales Order Validation Tool' });
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var errorMessages = [];

        try {
            var salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id: salesOrderId
            });
            
            // Check total
            var total = salesOrder.getValue('total');
            if (total < 0) {
                throw error.create({
                    name: 'SSS_NEGATIVE_TOTAL',
                    message: 'Sales Order total cannot be negative: ' + total,
                    id: 'SO_' + salesOrderId + '_TOTAL'
                });
            }

            // Check customer
            var customer = salesOrder.getValue('entity');
            if (!customer) {
                throw error.create({
                    name: 'SSS_MISSING_CUSTOMER',
                    message: 'Sales Order ' + salesOrderId + ' is missing a customer.',
                    id: 'SO_' + salesOrderId + '_CUST'
                });
            }

            log.debug({
                title: 'Validation Success',
                details: 'Sales Order ID: ' + salesOrderId + ' is valid.'
            });
            form.addField({
                id: 'custpage_status',
                type: serverWidget.FieldType.TEXT,
                label: 'Status'
            }).defaultValue = 'Sales Order is valid.';
        } catch (e) {
            log.error({
                title: 'Validation Error',
                details: 'Name: ' + e.name + ', Message: ' + e.message + ', ID: ' + e.id
            });
            errorMessages.push(e.message);
            form.addField({
                id: 'custpage_error',
                type: serverWidget.FieldType.TEXTAREA,
                label: 'Errors'
            }).defaultValue = errorMessages.join('\n');
        }

        scriptContext.response.writePage(form);
    }
    return {
        onRequest: onRequest
    };
});