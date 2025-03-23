/**
 * Concluding Mini-Project: Sales Order Data Formatter
Objective: Build a script that uses all N/format sub-subjects (format, parse, FormatType, TimeZone) to format and log Sales Order data in multiple styles.

Explanation: This project integrates all N/format methods and options to create a formatting tool that handles dates, numbers, and time zones, simulating a real-world use case like generating a formatted report or email body for a Sales Order.

Hands-On Coding Challenge:

Create a script to format and log Sales Order details with parsed dates and time zone adjustments.

Deployment/Viewing Instructions:

Save as fmt_mini_project.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order, then check the Execution Log for the formatted summary including date, total, and GMT time.
Next Steps
Expand: Pair N/format with N/email to send formatted data in an email body.
Challenge: Parse and reformat a user-entered date string from a custom field.
Deep Dive: Explore format.FormatType.PERCENT or other number formats for additional use cases.
 */

define(['N/format', 'N/log', 'N/record'], function(format, log, record) {
    function afterSubmit(scriptContext) {
        var order = scriptContext.newRecord;
        var orderId = order.id;
        var total = order.getValue('total');
        var tranDateStr = order.getValue('trandate'); // e.g., '3/17/2025'

        // Parse the transaction date
        var tranDate = format.parse({
            value: tranDateStr,
            type: format.FormatType.DATE,
            timezone: format.TimeZone.AMERICA_NEW_YORK
        });

        // Format the parsed date
        var formattedDate = format.format({
            value: tranDate,
            type: format.FormatType.DATE,
            timezone: format.TimeZone.AMERICA_NEW_YORK
        });

        // Format total as currency
        var formattedTotal = format.format({
            value: total,
            type: format.FormatType.CURRENCY
        });

        // Format current date-time in GMT
        var gmtTime = format.format({
            value: new Date(),
            type: format.FormatType.DATETIME,
            timezone: format.TimeZone.GMT
        });

        // Log the formatted summary
        var summary = 'Sales Order ID: ' + orderId + '\n' +
                      'Transaction Date: ' + formattedDate + '\n' +
                      'Total: ' + formattedTotal + '\n' +
                      'Processed at (GMT): ' + gmtTime;
        log.debug({
            title: 'Formatted Sales Order Data',
            details: summary
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});