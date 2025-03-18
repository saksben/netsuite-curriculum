/**
 * Lesson 2: Running a Map/Reduce Task with TaskType.MAP_REDUCE
Objective: Use task.create with TaskType.MAP_REDUCE to queue a Map/Reduce script.

Explanation: task.TaskType.MAP_REDUCE lets task.create schedule a Map/Reduce script, identified by scriptId. Map/Reduce is suited for processing large datasets (e.g., bulk record updates). Parameters can be passed via params. After submit, the task runs in the background. You’ll need an existing Map/Reduce script in your sandbox for this.

Deployment/Viewing Instructions:

Save as task2_mapreduce.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Access the External URL, then check Script Execution Logs or System Notes for the task ID and execution.
Hands-On Coding Challenge:
Queue a Map/Reduce script with a custom parameter.
 */

define(['N/task', 'N/log'], function(task, log) {
    function onRequest(scriptContext) {
        var mrTask = task.create({
            taskType: task.TaskType.MAP_REDUCE,
            scriptId: 456, // Replace with a valid Map/Reduce Script ID
            params: {
                custscript_process_date: '03/17/2025'
            }
        });
        var taskId = mrTask.submit();
        log.debug({
            title: 'Map/Reduce Task Submitted',
            details: 'Task ID: ' + taskId
        });
        scriptContext.response.write('Map/Reduce task submitted. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});