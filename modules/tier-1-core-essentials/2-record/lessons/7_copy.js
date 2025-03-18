/**
 * Lesson 7: Copying a Record (record.copy)
Objective: Duplicate a record with record.copy.

Explanation: record.copy creates a new record based on an existing one, preserving field values.

Steps:

Create record7_copy.js


Deploy to Sales Order. Save a Sales Order and check for the duplicate.
Project: Copy only the first line item to the new record by setting others to zero quantity.
 */

define(['N/record', 'N/log'], function(record, log) {
    function afterSubmit(scriptContext) {
        var newSalesOrder = record.copy({
            type: record.Type.SALES_ORDER,
            id: scriptContext.newRecord.id,
            isDynamic: false
        });
        newSalesOrder.setValue({
            fieldId: 'memo',
            value: 'Copied Record'
        });
        var newId = newSalesOrder.save();
        log.debug('Record Copied', 'New ID: ' + newId);
    }
    return {
        afterSubmit: afterSubmit
    };
});