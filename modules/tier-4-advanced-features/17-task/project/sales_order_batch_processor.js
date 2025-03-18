/**
 * Concluding Mini-Project: Sales Order Batch Processor
Objective: Build a Suitelet that uses all N/task sub-subjects (create, TaskType, checkStatus, task properties like scriptId, params) to manage multiple tasks for Sales Order processing.

Explanation: This project integrates all N/task methods and options to schedule a Scheduled Script, a Map/Reduce script, and a CSV import, then checks their statuses, simulating a batch processing system for Sales Orders (e.g., updates, imports, and reports).

Hands-On Coding Challenge:

Create a Suitelet to schedule and monitor three tasks related to Sales Orders.

Deployment/Viewing Instructions:

Save as task_mini_project.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log for the summary, Script Execution Logs for task runs, and CSV Import Status for the import.
Next Steps
Expand: Pair N/task with N/email to notify users when tasks complete.
Challenge: Add a loop to retry failed tasks (if status is FAILED).
Deep Dive: Explore other TaskType options like SEARCH or properties like priority.
 */

define(['N/task', 'N/file', 'N/log'], function(task, file, log) {
    function onRequest(scriptContext) {
        // Task 1: Schedule a Scheduled Script
        var scheduledTask = task.create({
            taskType: task.TaskType.SCHEDULED_SCRIPT,
            scriptId: 123, // Replace with a valid Scheduled Script ID
            params: { custscript_order_batch: 'Batch 1' }
        });
        var scheduledTaskId = scheduledTask.submit();

        // Task 2: Queue a Map/Reduce Script
        var mrTask = task.create({
            taskType: task.TaskType.MAP_REDUCE,
            scriptId: 456, // Replace with a valid Map/Reduce Script ID
            params: { custscript_process_date: '03/17/2025' }
        });
        var mrTaskId = mrTask.submit();

        // Task 3: Schedule a CSV Import
        var csvFile = file.create({
            name: 'sales_orders.csv',
            fileType: file.Type.CSV,
            contents: 'orderid,total\n1001,500.00',
            folder: -15
        });
        var fileId = csvFile.save();
        var csvTask = task.create({
            taskType: task.TaskType.CSV_IMPORT,
            fileId: fileId,
            importId: 789 // Replace with a valid Saved CSV Import ID
        });
        var csvTaskId = csvTask.submit();

        // Check statuses
        var scheduledStatus = task.checkStatus({ taskId: scheduledTaskId });
        var mrStatus = task.checkStatus({ taskId: mrTaskId });
        var csvStatus = task.checkStatus({ taskId: csvTaskId });

        // Log summary
        var summary = 'Batch Processor Results:\n' +
                      'Scheduled Task ID: ' + scheduledTaskId + ', Status: ' + scheduledStatus.status + '\n' +
                      'Map/Reduce Task ID: ' + mrTaskId + ', Status: ' + mrStatus.status + '\n' +
                      'CSV Import Task ID: ' + csvTaskId + ', Status: ' + csvStatus.status;
        log.debug({
            title: 'Batch Processing Summary',
            details: summary
        });

        scriptContext.response.write('Tasks scheduled. Check Execution Log and task statuses.');
    }
    return {
        onRequest: onRequest
    };
});