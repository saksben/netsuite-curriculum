/**
 * Lesson 2: Sending to Multiple Recipients
Objective: Use recipients to send an email to multiple users.

Explanation: The recipients option in email.send accepts an array of email addresses or entity IDs (e.g., customers, employees). This is useful for notifying multiple stakeholders. You can mix strings (emails) and numbers (IDs), and NetSuite resolves IDs to email addresses automatically.

Deployment/Viewing Instructions:

Save as email2_recipients.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order, then check the inboxes of all recipients and the Execution Log.
Hands-On Coding Challenge:
Send an email to multiple recipients when a Sales Order is saved.
 */

define(['N/email', 'N/log'], function(email, log) {
    function afterSubmit(scriptContext) {
        email.send({
            author: 123, // Replace with your employee ID
            recipients: ['your.email@example.com', 456], // Replace with your email and another employee ID
            subject: 'Sales Order Update',
            body: 'Sales Order ID: ' + scriptContext.newRecord.id + ' has been processed.'
        });
        log.debug({
            title: 'Multi-Recipient Email',
            details: 'Sent to multiple recipients for Sales Order ID: ' + scriptContext.newRecord.id
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});