/**
 * Lesson 1.2: Conditional Update with each and Parameters
Objective: Use each with parameters to conditionally update Sales Orders based on their total.

Explanation: Builds on Lesson 1.1 by adding conditional logic and script parameters, accessed via scriptContext.parameters. Parameters are defined in the script deployment and passed during the Mass Update setup, allowing dynamic updates. This lesson updates a custom field based on the Sales Order total compared to a threshold.

Deployment/Viewing Instructions:

Save as mu_params_each.js in the File Cabinet.
Deploy as a Mass Update Script (same as Lesson 1.1).
In the deployment (Customization > Scripting > Script Deployments > Edit), add a parameter:
Name: threshold, Type: Integer, Default: 1000 (Parameters tab > Add Parameter).
In the Mass Update setup:
Select Sales Order, add a filter (e.g., Main Line is true).
Add Custom Action, select this script, and set the Parameters field to threshold=1000 (or another value).
Run the Mass Update, check the custom field (custbody_status) on Sales Orders and the Execution Log.
Hands-On Coding Challenge:
Set a custom status field to “High Value” if the total exceeds a threshold parameter.
 */

define(['N/record', 'N/log'], function(record, log) {
    function each(scriptContext) {
        var salesOrder = record.load({
            type: scriptContext.type,
            id: scriptContext.id
        });
        var total = salesOrder.getValue('total');
        var threshold = scriptContext.parameters.threshold || 1000;

        if (total > threshold) {
            salesOrder.setValue({
                fieldId: 'custbody_status', // Replace with a valid custom field ID
                value: 'High Value'
            });
            log.debug({
                title: 'High Value Update',
                details: 'Sales Order ID: ' + scriptContext.id + ', Total: ' + total + ' exceeds threshold: ' + threshold
            });
        } else {
            salesOrder.setValue({
                fieldId: 'custbody_status',
                value: 'Standard'
            });
            log.debug({
                title: 'Standard Update',
                details: 'Sales Order ID: ' + scriptContext.id + ', Total: ' + total
            });
        }
        salesOrder.save();
    }
    return { each: each };
});