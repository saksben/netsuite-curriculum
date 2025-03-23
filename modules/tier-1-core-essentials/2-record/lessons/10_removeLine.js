/**
 * Lesson 10: Removing Lines with record.removeLine()
Objective: Use record.removeLine() to delete a specific item line from a Sales Order.

Explanation: record.removeLine() removes a line from a sublist in dynamic mode, requiring sublistId (e.g., 'item') and line (line number). It’s useful for cleanup or conditional removal before saving. This lesson removes lines with zero quantity.

Deployment/Viewing Instructions:

Save as ue_remove_line.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a User Event Script (Customization > Scripting > Scripts > New), set Script Type to User Event, link the file, and deploy to Sales Order (Status: Testing).
Edit a Sales Order with multiple item lines, set one quantity to 0, save, and verify the line is removed; check the Execution Log.
Hands-On Coding Challenge:
Remove item lines with a quantity of 0 before saving.
 */

define(['N/record', 'N/log'], function(record, log) {
    function beforeSubmit(scriptContext) {
        var newRecord = scriptContext.newRecord;
        if (scriptContext.type !== scriptContext.UserEventType.DELETE) {
            var lineCount = newRecord.getLineCount({ sublistId: 'item' });
            for (var i = lineCount - 1; i >= 0; i--) {
                var quantity = newRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i
                });
                if (!quantity || quantity <= 0) {
                    newRecord.removeLine({
                        sublistId: 'item',
                        line: i
                    });
                    log.debug({
                        title: 'Line Removed',
                        details: 'Removed line ' + i + ' with zero quantity'
                    });
                }
            }
        }
    }
    return { beforeSubmit: beforeSubmit };
});