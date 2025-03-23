/**
 * Below is a SuiteScript lesson plan for the N/task module in the "curriculum format" you’ve specified. It includes:

Lesson Number and Name
Objective
Explanation (with deployment/viewing instructions immediately following)
Hands-On Coding Challenge
Concluding Mini-Project (integrating all sub-subjects at the end)
The N/task module enables SuiteScript to schedule and manage asynchronous tasks like Scheduled Scripts, Map/Reduce Scripts, and CSV Imports. This plan covers its most common and useful sub-subjects (e.g., create, TaskType, checkStatus, task properties like scriptId, params), escalating in complexity to build your skills hands-on in your NetSuite sandbox.

SuiteScript Lesson Plan: Mastering the N/task Module
Lesson 1: Scheduling a Script with create (Scheduled Script)
Objective: Learn to schedule a script using task.create with TaskType.SCHEDULED_SCRIPT.

Explanation: task.create creates a Task object with a taskType (from task.TaskType, e.g., SCHEDULED_SCRIPT). For Scheduled Scripts, you specify scriptId (the script’s internal ID) and optionally deploymentId and params. Calling submit queues the task. This is ideal for running heavy processes asynchronously. Script IDs are found under Customization > Scripting > Scripts.

Deployment/Viewing Instructions:

Save the script file (e.g., task1_schedule.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script record (Customization > Scripting > Scripts > New), set Script Type to Suitelet, and link your file.
Deploy it (Customization > Scripting > Script Deployments), set Status to Released, and note the External URL.
Open the URL, then check System Notes (Setup > System Notes) or Script Execution Logs for the task submission, and verify the Scheduled Script runs (Customization > Scripting > Script Deployments).
Hands-On Coding Challenge:
Schedule a simple Scheduled Script to run from a Suitelet.
 */

define(['N/task', 'N/log'], function(task, log) {
    function onRequest(scriptContext) {
        var scheduledTask = task.create({
            taskType: task.TaskType.SCHEDULED_SCRIPT,
            scriptId: 123 // Replace with a valid Scheduled Script ID from your sandbox
        });
        var taskId = scheduledTask.submit();
        log.debug({
            title: 'Scheduled Task Submitted',
            details: 'Task ID: ' + taskId
        });
        scriptContext.response.write('Scheduled task submitted. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});