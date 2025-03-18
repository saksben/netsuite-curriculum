/**
 * Lesson 2: Creating a New Record
Objective: Use record.create to make a new record and set field values.

Explanation: record.create initializes a new record, and setValue sets field data before saving with save.

Steps:

Create record2_create.js


Deploy to Sales Order. Save a Sales Order and check Activities > Tasks for the new task.
Project: Add a second field (e.g., assigned) using setValue and set it to the Sales Order’s salesrep.
 */

define(['N/record', 'N/log'], function(record, log) {
    function afterSubmit(scriptContext) {
        var newTask = record.create({
            type: record.Type.TASK,
            isDynamic: true
        });
        newTask.setValue({
            fieldId: 'title',
            value: 'Test Task from SuiteScript'
        });
        var taskId = newTask.save();
        log.debug('Task Created', 'ID: ' + taskId);
    }
    return {
        afterSubmit: afterSubmit
    };
});