/**
 * Lesson 4: Working with Sublists (getLineCount, getSublistValue)
Objective: Access sublist data using getLineCount and getSublistValue.

Explanation: Sublists (e.g., line items) are arrays of data; these methods let you count lines and read values.

Steps:

Create record4_sublist.js


Deploy to Sales Order. Load a Sales Order with items and check the log.
Project: Log the quantity and amount for the first line using getSublistValue.
 */

define(['N/record', 'N/log'], function(record, log) {
    function beforeLoad(scriptContext) {
        var salesOrder = scriptContext.newRecord;
        var lineCount = salesOrder.getLineCount({
            sublistId: 'item'
        });
        if (lineCount > 0) {
            var firstItem = salesOrder.getSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                line: 0
            });
            log.debug('Sublist Info', 'Lines: ' + lineCount + ', First Item ID: ' + firstItem);
        }
    }
    return {
        beforeLoad: beforeLoad
    };
});