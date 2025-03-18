/**
 * Lesson 6: Dynamic Mode (selectLine, setCurrentSublistValue)
Objective: Use dynamic mode to interact with sublists line-by-line.

Explanation: In dynamic mode (isDynamic: true), you select lines and set values using “current” methods.

Steps:

Create record6_dynamic.js


Deploy to Sales Order. Edit and save a Sales Order, then verify the first line’s quantity.
Project: Add a check with getCurrentSublistValue to only update if the current quantity is less than 10.
 */

define(['N/record', 'N/log'], function(record, log) {
    function beforeSubmit(scriptContext) {
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: scriptContext.newRecord.id,
            isDynamic: true
        });
        salesOrder.selectLine({
            sublistId: 'item',
            line: 0
        });
        salesOrder.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
            value: 5
        });
        salesOrder.commitLine({ sublistId: 'item' });
        salesOrder.save();
        log.debug('Dynamic Update', 'Set quantity to 5 on line 0');
    }
    return {
        beforeSubmit: beforeSubmit
    };
});