/**
 * Lesson 5: Setting Sublist Values (setSublistValue)
Objective: Modify sublist data with setSublistValue.

Explanation: Use setSublistValue to update sublist fields, ideal for dynamic records.

Steps:

Create record5_setsublist.js


Deploy to Sales Order. Edit a Sales Order with items, save, and check the first item’s Description.
Project: Set the location field on all lines to a specific value (e.g., 1) using a loop over lineCount.
 */

define(['N/record', 'N/log'], function(record, log) {
    function beforeSubmit(scriptContext) {
        var salesOrder = scriptContext.newRecord;
        var lineCount = salesOrder.getLineCount({ sublistId: 'item' });
        if (lineCount > 0) {
            salesOrder.setSublistValue({
                sublistId: 'item',
                fieldId: 'description',
                line: 0,
                value: 'Updated by SuiteScript'
            });
            log.debug('Sublist Updated', 'Description set on line 0');
        }
    }
    return {
        beforeSubmit: beforeSubmit
    };
});