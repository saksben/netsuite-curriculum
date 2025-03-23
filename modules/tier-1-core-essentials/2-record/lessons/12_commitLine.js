/**
 * Lesson 12: Committing Lines with record.commitLine()
Objective: Use record.commitLine() to save a newly added or edited item line on a Sales Order.

Explanation: record.commitLine() commits the current line in a sublist in dynamic mode, requiring sublistId. It finalizes changes after selectNewLine or selectLine, ensuring the line is added or updated. This lesson duplicates the first line’s item.

Deployment/Viewing Instructions: Same as Lesson 1.1; edit a Sales Order with at least one item, save, and verify a duplicate line is added; check the Execution Log.

Hands-On Coding Challenge:

Duplicate the first item line before saving.
 */

define(['N/record', 'N/log'], function(record, log) {
    function beforeSubmit(scriptContext) {
        var newRecord = scriptContext.newRecord;
        if (scriptContext.type !== scriptContext.UserEventType.DELETE) {
            var lineCount = newRecord.getLineCount({ sublistId: 'item' });
            if (lineCount > 0) {
                var firstItem = newRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: 0
                });
                var firstQty = newRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: 0
                });
                newRecord.selectNewLine({ sublistId: 'item' });
                newRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: firstItem
                });
                newRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: firstQty
                });
                newRecord.commitLine({ sublistId: 'item' });
                log.debug({
                    title: 'Line Committed',
                    details: 'Duplicated first item line: Item ' + firstItem + ', Qty ' + firstQty
                });
            }
        }
    }
    return { beforeSubmit: beforeSubmit };
});