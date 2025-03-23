/**
 * Lesson 1: Initiating a Workflow with initiate
Objective: Learn to start a workflow on a record using workflow.initiate.

Explanation: workflow.initiate begins a workflow for a specific record, requiring workflowId (the internal ID of the workflow from Customization > Workflow > Workflows), recordType (e.g., salesorder), and recordId (the record’s internal ID). It returns the initial workflowInstanceId. This is synchronous and immediate, ideal for starting workflows on demand. Create a basic workflow in your sandbox (e.g., set a field on Sales Order save) to test this.

Deployment/Viewing Instructions:

Save the script file (e.g., wf1_initiate.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script record (Customization > Scripting > Scripts > New), set Script Type to Suitelet, and link your file.
Deploy it (Customization > Scripting > Script Deployments), set Status to Released, and note the External URL.
Open the URL, then check the Execution Log for the workflow instance ID and the Sales Order (Transactions > Sales > Enter Sales Orders > List) for workflow effects.
Hands-On Coding Challenge:
Initiate a workflow on a Sales Order and log the instance ID.
 */

define(['N/workflow', 'N/log'], function(workflow, log) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var workflowInstanceId = workflow.initiate({
            workflowId: 'customworkflow_test', // Replace with your workflow’s ID (e.g., customworkflow_test)
            recordType: 'salesorder',
            recordId: salesOrderId
        });
        log.debug({
            title: 'Workflow Initiated',
            details: 'Workflow Instance ID: ' + workflowInstanceId + ' for Sales Order ' + salesOrderId
        });
        scriptContext.response.write('Workflow initiated. Check logs and Sales Order.');
    }
    return {
        onRequest: onRequest
    };
});