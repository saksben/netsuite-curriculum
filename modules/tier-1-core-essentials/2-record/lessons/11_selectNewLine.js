/**
 * Lesson 11: Adding New Lines with record.selectNewLine()
Objective: Use record.selectNewLine() to prepare a new item line on a Sales Order for entry.

Explanation: record.selectNewLine() selects a new line in a sublist in dynamic mode, requiring sublistId. It’s the first step to add a line, followed by setting values and committing. This lesson adds a default item when no lines exist.

Deployment/Viewing Instructions: Same as Lesson 1.1; create a new Sales Order with no items, save, and verify a default item line is added; check the Execution Log.

Hands-On Coding Challenge:

Add a default item line if the Sales Order has no items on creation.
 */

define(['N/record', 'N/log'], function(record, log) {
    function beforeSubmit(scriptContext) {
        var newRecord = scriptContext.newRecord;
        if (scriptContext.type === scriptContext.UserEventType.CREATE) {
            var lineCount = newRecord.getLineCount({ sublistId: 'item' });
            if (lineCount === 0) {
                newRecord.selectNewLine({ sublistId: 'item' });
                newRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: '101' // Replace with a valid item ID
                });
                newRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: 1
                });
                newRecord.commitLine({ sublistId: 'item' });
                log.debug({
                    title: 'New Line Added',
                    details: 'Added default item to new Sales Order'
                });
            }
        }
    }
    return { beforeSubmit: beforeSubmit };
});