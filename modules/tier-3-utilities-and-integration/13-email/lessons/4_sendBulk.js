/**
 * Lesson 4: Sending Bulk Emails with sendBulk
Objective: Use email.sendBulk to send multiple emails efficiently.

Explanation: email.sendBulk sends multiple emails in one call, taking an array of email objects with the same options as send (author, recipients, etc.). It’s optimized for batch notifications, reducing script execution time compared to multiple send calls.

Deployment/Viewing Instructions:

Save as email4_sendbulk.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order, then check the inboxes of recipients and the Execution Log.
Hands-On Coding Challenge:
Send bulk emails to two recipients with different messages.
 */

define(['N/email', 'N/log'], function(email, log) {
    function afterSubmit(scriptContext) {
        var orderId = scriptContext.newRecord.id;
        email.sendBulk({
            emails: [
                {
                    author: 123, // Replace with your employee ID
                    recipients: 'your.email@example.com',
                    subject: 'Sales Order Confirmation',
                    body: 'Your Sales Order ID: ' + orderId + ' is confirmed.'
                },
                {
                    author: 123,
                    recipients: 456, // Replace with another employee ID
                    subject: 'Sales Order Alert',
                    body: 'Sales Order ID: ' + orderId + ' needs review.'
                }
            ]
        });
        log.debug({
            title: 'Bulk Emails Sent',
            details: 'Sent 2 emails for Sales Order ID: ' + orderId
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});