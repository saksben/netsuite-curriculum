/**
 * Concluding Mini-Project: Sales Order Automation Suite
Objective: Build a User Event Script using beforeLoad, beforeSubmit, and afterSubmit to automate Sales Order processing with defaults, validation, updates, and notifications.

Explanation: Integrates all three entry points to create a comprehensive automation tool: sets defaults on load, validates and updates fields before save, and logs with email notification after save. This simulates a real-world Sales Order management script.

Hands-On Coding Challenge:

Create a script to set defaults, enforce rules, update status, and notify for high-value Sales Orders.

Deployment/Viewing Instructions:

Save as ue_sales_order_automation.js in the File Cabinet.
Deploy to Sales Order (same as Lesson 1.1).
Test by:
Creating a Sales Order: Check Memo for default value.
Saving without a customer: See the validation error.
Saving with a total > 1000: Verify custbody_approval_status and receive an email.
Check the Execution Log for debug and audit entries.
Notes
Custom Field: Replace custbody_approval_status with a valid custom field ID (e.g., a text or list field); create one if needed (Customization > Lists, Records & Fields > Transaction Body Fields > New).
Email: Replace currentUser in email.send with a specific recipient ID or email address for production use.
Permissions: Ensure your role can edit Sales Orders and send emails.
Next Steps: Add UI modifications in beforeLoad (e.g., form.addButton), or integrate with N/task for post-save tasks.
 */

define(['N/log', 'N/error', 'N/email', 'N/runtime'], function(log, error, email, runtime) {
    // Set defaults on form load
    function beforeLoad(scriptContext) {
        if (scriptContext.type === scriptContext.UserEventType.CREATE) {
            var newRecord = scriptContext.newRecord;
            newRecord.setValue({
                fieldId: 'memo',
                value: 'Created at ' + new Date().toISOString()
            });
            log.debug({
                title: 'Before Load',
                details: 'Set default memo for new Sales Order'
            });
        }
    }

    // Validate and update before save
    function beforeSubmit(scriptContext) {
        var newRecord = scriptContext.newRecord;
        var total = newRecord.getValue('total');

        // Validation
        if (!newRecord.getValue('entity')) {
            throw error.create({
                name: 'MISSING_CUSTOMER',
                message: 'Customer is required before saving.'
            });
        }

        // Update status
        var status = total > 1000 ? 'Pending Approval' : 'Approved';
        newRecord.setValue({
            fieldId: 'custbody_approval_status', // Replace with a valid custom field ID
            value: status
        });
        log.debug({
            title: 'Before Submit',
            details: 'Set status to ' + status + ' for Sales Order ID: ' + newRecord.id
        });
    }

    // Log and notify after save
    function afterSubmit(scriptContext) {
        var newRecord = scriptContext.newRecord;
        var total = newRecord.getValue('total');
        var status = newRecord.getValue('custbody_approval_status');
        var currentUser = runtime.getCurrentUser().id;

        log.audit({
            title: 'After Submit',
            details: 'Sales Order ID: ' + newRecord.id + 
                     ', Total: ' + total + 
                     ', Status: ' + status + 
                     ', Customer: ' + newRecord.getText('entity')
        });

        if (status === 'Pending Approval') {
            email.send({
                author: currentUser,
                recipients: currentUser, // Replace with a manager’s ID or email
                subject: 'Sales Order ' + newRecord.id + ' Pending Approval',
                body: 'Sales Order ' + newRecord.id + ' requires approval.\n' +
                      'Total: ' + total + '\n' +
                      'Customer: ' + newRecord.getText('entity')
            });
            log.debug({
                title: 'Email Sent',
                details: 'Notification for high-value Sales Order ID: ' + newRecord.id
            });
        }
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
});