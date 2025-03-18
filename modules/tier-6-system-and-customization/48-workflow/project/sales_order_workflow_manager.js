/**
 * Concluding Mini-Project: Sales Order Workflow Manager
Objective: Build a Suitelet that uses all N/workflow sub-subjects (initiate, trigger, initiateWorkflowAsync) to manage workflows on a Sales Order with a user interface.

Explanation: This project integrates all N/workflow methods to create a tool that initiates a workflow synchronously, triggers a specific action, and queues an asynchronous workflow, displaying results in a form. It simulates a real-world use case like automating Sales Order approvals or updates with workflow control. You’ll need a test workflow with at least one action defined.

Hands-On Coding Challenge:

Create a Suitelet to manage workflows on a Sales Order and display statuses.

Deployment/Viewing Instructions:

Save as wf_mini_project.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the form for workflow instance IDs, action status, and task ID, the Execution Log for details, and the Sales Order for workflow effects.
Prerequisites
Create a test workflow (Customization > Workflow > Workflows > New) for Sales Orders with:
A simple action (e.g., “Set Field Value” to update a field like memo).
Note its workflowId (e.g., customworkflow_test) and actionId (e.g., action_set_field) from the workflow editor.
 */

define(['N/workflow', 'N/log', 'N/task', 'N/ui/serverWidget'], function(workflow, log, task, serverWidget) {
    function onRequest(scriptContext) {
        var form = serverWidget.createForm({ title: 'Sales Order Workflow Manager' });
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var workflowId = 'customworkflow_test'; // Replace with your workflow ID

        // Step 1: Initiate Workflow Synchronously
        try {
            var workflowInstanceId = workflow.initiate({
                workflowId: workflowId,
                recordType: 'salesorder',
                recordId: salesOrderId
            });
            log.debug({
                title: 'Synchronous Workflow',
                details: 'Instance ID: ' + workflowInstanceId
            });
            form.addField({
                id: 'custpage_sync',
                type: serverWidget.FieldType.TEXT,
                label: 'Sync Workflow Instance ID'
            }).defaultValue = workflowInstanceId;
        } catch (e) {
            log.error({ title: 'Sync Error', details: e.message });
        }

        // Step 2: Trigger a Workflow Action
        try {
            workflow.trigger({
                workflowId: workflowId,
                recordType: 'salesorder',
                recordId: salesOrderId,
                actionId: 'action_set_field' // Replace with your action ID
            });
            log.debug({
                title: 'Action Triggered',
                details: 'Action executed for Sales Order ' + salesOrderId
            });
            form.addField({
                id: 'custpage_action',
                type: serverWidget.FieldType.TEXT,
                label: 'Action Status'
            }).defaultValue = 'Action triggered successfully.';
        } catch (e) {
            log.error({ title: 'Trigger Error', details: e.message });
        }

        // Step 3: Initiate Workflow Asynchronously
        try {
            var taskId = workflow.initiateWorkflowAsync({
                workflowId: workflowId,
                recordType: 'salesorder',
                recordId: salesOrderId
            });
            var taskStatus = task.checkStatus({ taskId: taskId });
            log.debug({
                title: 'Async Workflow',
                details: 'Task ID: ' + taskId + ', Status: ' + taskStatus.status
            });
            form.addField({
                id: 'custpage_async',
                type: serverWidget.FieldType.TEXT,
                label: 'Async Task ID'
            }).defaultValue = taskId + ' (' + taskStatus.status + ')';
        } catch (e) {
            log.error({ title: 'Async Error', details: e.message });
        }

        scriptContext.response.writePage(form);
    }
    return {
        onRequest: onRequest
    };
});