/**
 * Lesson 3: Initiating a Workflow Asynchronously with initiateWorkflowAsync
Objective: Use workflow.initiateWorkflowAsync to start a workflow in the background.

Explanation: workflow.initiateWorkflowAsync queues a workflow to run asynchronously, taking the same parameters as initiate (workflowId, recordType, recordId) and returning a taskId for tracking via N/task. This is useful for long-running workflows to avoid governance limits in synchronous scripts. Pair it with N/task to monitor progress.

Deployment/Viewing Instructions:

Save as wf3_async.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log for the task ID and System Notes or the Sales Order for workflow effects over time.
Hands-On Coding Challenge:
Initiate a workflow asynchronously on a Sales Order and log the task ID.
 */

define(['N/workflow', 'N/log', 'N/task'], function(workflow, log, task) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var taskId = workflow.initiateWorkflowAsync({
            workflowId: 'customworkflow_test', // Replace with your workflow ID
            recordType: 'salesorder',
            recordId: salesOrderId
        });
        var taskStatus = task.checkStatus({ taskId: taskId });
        log.debug({
            title: 'Async Workflow Initiated',
            details: 'Task ID: ' + taskId + ', Initial Status: ' + taskStatus.status
        });
        scriptContext.response.write('Async workflow started. Check logs and Sales Order.');
    }
    return {
        onRequest: onRequest
    };
});