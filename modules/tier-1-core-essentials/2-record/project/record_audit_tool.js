/**
 * Example Project - Record Audit Tool
Objective: Combine methods for a practical tool.

Explanation: Build a script to log detailed record changes.

Steps:

Create record10_audit.js


Deploy to Sales Order. Edit and save a Sales Order, then check the log.
Project: Add dynamic mode to update each line’s description with “Audited” if quantity exceeds 10.
 */

define(['N/record', 'N/log'], function(record, log) {
    function beforeSubmit(scriptContext) {
        var salesOrder = scriptContext.newRecord;
        var lineCount = salesOrder.getLineCount({ sublistId: 'item' });
        var auditLog = 'Record ID: ' + salesOrder.id + '\n';
        auditLog += 'Subtotal: ' + salesOrder.getValue('subtotal') + '\n';
        auditLog += 'Line Count: ' + lineCount + '\n';
        for (var i = 0; i < lineCount; i++) {
            auditLog += 'Line ' + i + ': Item ' + 
                salesOrder.getSublistValue({ sublistId: 'item', fieldId: 'item', line: i }) + 
                ', Qty ' + salesOrder.getSublistValue({ sublistId: 'item', fieldId: 'quantity', line: i }) + '\n';
        }
        log.debug('Audit Log', auditLog);
        salesOrder.setValue({ fieldId: 'memo', value: 'Audited' });
    }
    return {
        beforeSubmit: beforeSubmit
    };
});