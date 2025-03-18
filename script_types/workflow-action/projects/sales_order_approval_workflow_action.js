/**
 * Concluding Mini-Project: Sales Order Approval Workflow Action
Objective: Build a Workflow Action Script using onAction to manage Sales Order approval status, log activity, and notify via email based on conditions and parameters.

Explanation: Integrates onAction with conditional logic, parameters, logging, and email functionality to create a comprehensive action for a Sales Order approval workflow. It checks the total against a threshold, updates a status field, logs the action, and sends an email if approval is needed, simulating a real-world workflow enhancement.

Hands-On Coding Challenge:

Create a script to set an approval status, log details, and email a notification for high-value Sales Orders.

Deployment/Viewing Instructions:

Save as wa_sales_order_approval.js in the File Cabinet.
Deploy as a Workflow Action Script (same as Lesson 1.1).
Set up a workflow:
Record Type: Sales Order, Trigger Type: After Record Submit.
Add a state (e.g., “Approval Check”), add this script as a custom action (Actions > Add Action > Custom).
In the deployment, add a parameter threshold (Type: Integer, Default: 1000), and reference it in the workflow action settings.
Test by creating/editing a Sales Order:
Check the custbody_approval_status field on the Sales Order.
Verify the Execution Log for audit and debug entries.
Check your email (or the recipient’s) for high-value notifications.
Notes
Custom Field: Replace custbody_approval_status with a valid custom field ID (e.g., a text or list field); create one if needed (Customization > Lists, Records & Fields > Transaction Body Fields > New).
Email: Replace currentUser in email.send with a specific recipient ID or email address for production use.
Workflow Setup: Ensure the workflow triggers on appropriate events (e.g., After Record Submit) and states align with your process.
Permissions: Confirm your role can edit Sales Orders and send emails.
Next Steps: Add return values (e.g., return 'T' for true) to influence workflow transitions, or integrate with N/task for follow-up actions.
 */

define(['N/log', 'N/email', 'N/runtime'], function(log, email, runtime) {
    function onAction(scriptContext) {
        var newRecord = scriptContext.newRecord;
        var oldRecord = scriptContext.oldRecord;
        var total = newRecord.getValue('total');
        var threshold = scriptContext.getParameter({ name: 'threshold' }) || 1000;
        var currentUser = runtime.getCurrentUser().id;

        // Determine status and update
        var status = total > threshold ? 'Pending Approval' : 'Auto-Approved';
        newRecord.setValue({
            fieldId: 'custbody_approval_status', // Replace with a valid custom field ID
            value: status
        });

        // Log the action
        var logDetails = 'Sales Order ID: ' + newRecord.id + 
                        ', Total: ' + total + 
                        ', Status: ' + status + 
                        ', Threshold: ' + threshold;
        log.audit({
            title: 'Workflow Action: Approval Status Set',
            details: logDetails
        });

        // Send email for high-value orders
        if (status === 'Pending Approval') {
            var oldTotal = oldRecord ? oldRecord.getValue('total') : 0;
            var emailBody = 'Sales Order ' + newRecord.id + ' requires approval.\n' +
                           'Total: ' + total + ' (Previous: ' + oldTotal + ')\n' +
                           'Customer: ' + newRecord.getText('entity') + '\n' +
                           'Updated by Workflow Action.';
            email.send({
                author: currentUser,
                recipients: currentUser, // Replace with a manager’s ID or email
                subject: 'High-Value Sales Order Approval Needed',
                body: emailBody
            });
            log.debug({
                title: 'Email Sent',
                details: 'Notification for SO ' + newRecord.id
            });
        }
    }
    return { onAction: onAction };
});