/**
 * Lesson 1.2: Conditional Logic with onAction and Parameters
Objective: Use onAction with workflow parameters to conditionally update a Sales Order based on its total.

Explanation: Builds on Lesson 1.1 by introducing conditional logic and workflow parameters, accessed via scriptContext.getParameter. Parameters are defined in the workflow action setup, enabling dynamic behavior. This lesson updates a custom field based on the Sales Order total compared to a threshold.

Deployment/Viewing Instructions:

Save as wa_params_onaction.js in the File Cabinet.
Deploy as a Workflow Action Script (same as Lesson 1.1).
In the workflow:
Add a parameter in the script deployment (Parameters tab > Add Parameter, e.g., threshold, Type: Integer, Default: 1000).
Link the script as a custom action, set the Parameters field to reference threshold.
Trigger the workflow on a Sales Order, check the custom field (custbody_status) and Execution Log.
Hands-On Coding Challenge:
Set a custom status field to “High Value” if the total exceeds a threshold parameter.
 */

define(['N/log'], function(log) {
    function onAction(scriptContext) {
        var newRecord = scriptContext.newRecord;
        var total = newRecord.getValue('total');
        var threshold = scriptContext.getParameter({ name: 'threshold' }) || 1000;

        if (total > threshold) {
            newRecord.setValue({
                fieldId: 'custbody_status', // Replace with a valid custom field ID
                value: 'High Value'
            });
            log.debug({
                title: 'High Value Detected',
                details: 'Sales Order ID: ' + newRecord.id + ', Total: ' + total + ' exceeds threshold: ' + threshold
            });
        } else {
            newRecord.setValue({
                fieldId: 'custbody_status',
                value: 'Standard'
            });
            log.debug({
                title: 'Standard Value',
                details: 'Sales Order ID: ' + newRecord.id + ', Total: ' + total
            });
        }
    }
    return { onAction: onAction };
});