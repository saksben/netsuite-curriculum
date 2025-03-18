/**
 * Concluding Mini-Project: Sales Order Validation Logger
Objective: Build a script that uses all N/log methods (debug, audit, error, emergency) to log a comprehensive validation summary for a Sales Order.

Explanation: This project integrates all logging methods to monitor script execution, track key actions, report issues, and flag critical errors. You’ll validate a Sales Order’s data (e.g., customer, total, subtotal) and log appropriately based on severity, giving you a practical tool to debug and audit in your sandbox.

Hands-On Coding Challenge:

Create a script to log Sales Order details at different severity levels based on conditions.

Deployment/Viewing Instructions:

Save as log_mini_project.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing and Log Level: DEBUG (to see all log levels).
Edit and save a Sales Order (try with/without a customer, varying totals/subtotals), then check the Execution Log for a mix of debug, audit, error, and emergency entries.
Next Steps
Expand: Pair N/log with N/runtime to log user or script context (e.g., execution time).
Challenge: Add N/email to send emergency logs to an admin.
Deep Dive: Experiment with logging complex objects (e.g., JSON.stringify an array) in details.
 */

define(['N/log'], function(log) {
    function beforeSubmit(scriptContext) {
        var salesOrder = scriptContext.newRecord;
        var customer = salesOrder.getValue('entity');
        var total = salesOrder.getValue('total');
        var subtotal = salesOrder.getValue('subtotal');

        // Debug: Log basic execution info
        log.debug({
            title: 'Validation Started',
            details: 'Checking Sales Order ID: ' + salesOrder.id
        });

        // Audit: Log successful customer assignment
        if (customer) {
            log.audit({
                title: 'Customer Assigned',
                details: 'Customer ID: ' + customer
            });
        } else {
            // Error: Log missing customer
            log.error({
                title: 'Customer Missing',
                details: 'No customer selected on Sales Order ID: ' + salesOrder.id
            });
        }

        // Audit: Log high-value order
        if (total > 1000) {
            log.audit({
                title: 'High-Value Order Detected',
                details: 'Total: ' + total
            });
        }

        // Emergency: Log critical negative subtotal
        if (subtotal < 0) {
            log.emergency({
                title: 'Critical Error: Negative Subtotal',
                details: 'Subtotal: ' + subtotal + ' on Sales Order ID: ' + salesOrder.id
            });
        } else {
            // Debug: Log normal subtotal
            log.debug({
                title: 'Subtotal Check',
                details: 'Subtotal is ' + subtotal
            });
        }
    }
    return {
        beforeSubmit: beforeSubmit
    };
});