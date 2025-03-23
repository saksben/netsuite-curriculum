/**
 * Lesson 3: Formatting Numbers with FormatType
Objective: Format a number using format.FormatType options like CURRENCY or INTEGER.

Explanation: format.format can format numbers with type options such as CURRENCY, FLOAT, or INTEGER. This ensures numbers display correctly (e.g., with commas, decimals, or currency symbols), ideal for financial data or UI presentation. FormatType defines the structure.

Deployment/Viewing Instructions:

Save as fmt3_format_number.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order, then check the Execution Log for the formatted number.
Hands-On Coding Challenge:
Format a Sales Order total as currency and log it.
 */

define(['N/format', 'N/log'], function(format, log) {
    function afterSubmit(scriptContext) {
        var total = scriptContext.newRecord.getValue('total');
        var formattedTotal = format.format({
            value: total,
            type: format.FormatType.CURRENCY
        });
        log.debug({
            title: 'Formatted Total',
            details: 'Sales Order Total: ' + formattedTotal
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});