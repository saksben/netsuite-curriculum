/**
 * Lesson 4: Checking Task Status with checkStatus
Objective: Use task.checkStatus to monitor a task’s progress.

Explanation: task.checkStatus takes a taskId and returns a TaskStatus object with properties like status (e.g., PENDING, COMPLETE, FAILED). This is crucial for tracking asynchronous tasks and handling their outcomes.

Deployment/Viewing Instructions:

Save as task4_status.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL multiple times (after running a prior task), then check the Execution Log for status updates.
Hands-On Coding Challenge:
Schedule a task and check its status.
 */

define(['N/task', 'N/log'], function(task, log) {
    function onRequest(scriptContext) {
        var scheduledTask = task.create({
            taskType: task.TaskType.SCHEDULED_SCRIPT,
            scriptId: 123 // Replace with a valid Scheduled Script ID
        });
        var taskId = scheduledTask.submit();

        var status = task.checkStatus({
            taskId: taskId
        });
        log.debug({
            title: 'Task Status',
            details: 'Task ID: ' + taskId + ', Status: ' + status.status
        });
        scriptContext.response.write('Task status logged. Check Execution Log.');
    }
    return {
        onRequest: onRequest
    };
});