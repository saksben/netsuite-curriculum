/**
 * Lesson 8: Deleting a Record (record.delete)
Objective: Remove a record with record.delete.

Explanation: record.delete permanently removes a record by type and ID.

Steps:

Create record8_delete.js


Deploy to Sales Order. Save a Sales Order and check the log for creation and deletion.
Project: Add a condition to delete only if a Sales Order field (e.g., subtotal) is below 100.
 */

define(['N/record', 'N/log'], function(record, log) {
    function afterSubmit(scriptContext) {
        var taskId = record.create({
            type: record.Type.TASK,
            isDynamic: false
        }).setValue({
            fieldId: 'title',
            value: 'Temp Task'
        }).save();
        log.debug('Task Created', 'ID: ' + taskId);
        record.delete({
            type: record.Type.TASK,
            id: taskId
        });
        log.debug('Task Deleted', 'ID: ' + taskId);
    }
    return {
        afterSubmit: afterSubmit
    };
});