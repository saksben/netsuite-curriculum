/**
 * Lesson 9: Transforming Records (record.transform)
Objective: Convert one record type to another with record.transform.

Explanation: record.transform creates a new record (e.g., Sales Order to Invoice) while copying relevant data.

Steps:

Create record9_transform.js


Deploy to Sales Order. Save a Sales Order and check for the new Invoice (Transactions > Sales > Invoice).
Project: Transform only specific lines by removing others with setSublistValue (e.g., set quantity to 0).
 */

define(['N/record', 'N/log'], function(record, log) {
    function afterSubmit(scriptContext) {
        var invoice = record.transform({
            fromType: record.Type.SALES_ORDER,
            fromId: scriptContext.newRecord.id,
            toType: record.Type.INVOICE,
            isDynamic: false
        });
        invoice.setValue({
            fieldId: 'memo',
            value: 'Transformed from Sales Order'
        });
        var invoiceId = invoice.save();
        log.debug('Transformed', 'Invoice ID: ' + invoiceId);
    }
    return {
        afterSubmit: afterSubmit
    };
});