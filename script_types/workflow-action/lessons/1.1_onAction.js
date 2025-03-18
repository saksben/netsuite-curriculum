/**
 * Lesson 1.1: Basic Action Execution with onAction
Objective: Use onAction to update a Sales Order field when triggered by a workflow.

Explanation: The onAction entry point is the handler for Workflow Action Scripts, receiving a scriptContext object with newRecord, oldRecord (if applicable), and workflowId. It runs when the workflow invokes the action, allowing record updates or logging. This lesson focuses on a simple field update triggered by a workflow state.

Deployment/Viewing Instructions:

Save as wa_basic_onaction.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a Workflow Action Script (Customization > Scripting > Scripts > New), set Script Type to Workflow Action, link the file, and deploy (Status: Released).
Create a workflow (Customization > Workflow > Workflows > New):
Record Type: Sales Order, Trigger Type: After Record Submit, State: Add a state (e.g., “Initial”).
Add a Custom Action: Select this script under Action in the state (Actions > Add Action > Custom).
Save and test by creating/editing a Sales Order, then check the Memo field and Execution Log.
Hands-On Coding Challenge:
Set the Memo field to a timestamp when the workflow triggers the action.
 */

define(['N/log'], function(log) {
    function onAction(scriptContext) {
        var newRecord = scriptContext.newRecord;
        newRecord.setValue({
            fieldId: 'memo',
            value: 'Processed at ' + new Date().toISOString()
        });
        log.debug({
            title: 'Workflow Action Executed',
            details: 'Updated memo for Sales Order ID: ' + newRecord.id
        });
    }
    return { onAction: onAction };
});