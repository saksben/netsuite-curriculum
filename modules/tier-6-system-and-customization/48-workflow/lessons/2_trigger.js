/**
 * Lesson 2: Triggering a Workflow Action with trigger
Objective: Use workflow.trigger to execute a specific action in a workflow.

Explanation: workflow.trigger invokes a specific action within an active workflow instance, requiring workflowId, recordType, recordId, and actionId (from the workflow action’s definition). This allows fine-grained control over workflow execution, such as skipping to a specific step. You’ll need a workflow with a defined action (e.g., “Set Field Value”) and its ID (visible in the workflow editor).

Deployment/Viewing Instructions:

Save as wf2_trigger.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log and Sales Order for the action’s effect (e.g., a field update).
Hands-On Coding Challenge:
Trigger a workflow action to update a Sales Order field.
 */

define(['N/workflow', 'N/log'], function(workflow, log) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        workflow.trigger({
            workflowId: 'customworkflow_test', // Replace with your workflow ID
            recordType: 'salesorder',
            recordId: salesOrderId,
            actionId: 'action_set_field' // Replace with a valid action ID from your workflow
        });
        log.debug({
            title: 'Workflow Action Triggered',
            details: 'Action triggered for Sales Order ' + salesOrderId
        });
        scriptContext.response.write('Action triggered. Check logs and Sales Order.');
    }
    return {
        onRequest: onRequest
    };
});