/**
 * Concluding Mini-Project: Sales Order Notification System
Objective: Build a script that uses all N/email sub-subjects (send, sendBulk, recipients, subject, body, attachments) to notify stakeholders about a Sales Order with detailed emails.

Explanation: This project integrates all N/email methods and options to create a notification system that sends a single email with an attachment to the sales rep and bulk emails to other stakeholders, simulating a real-world use case like order confirmation and team alerts.

Hands-On Coding Challenge:

Create a script to send a detailed email with an attachment and bulk notifications for a Sales Order.

Deployment/Viewing Instructions:

Save as email_mini_project.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order with a sales rep and customer assigned, then check the inboxes of the sales rep, customer (if email is set), and supervisor, plus the Execution Log.
Next Steps
Expand: Pair N/email with N/search to notify all users in a role about multiple orders.
Challenge: Add CC or BCC recipients using cc and bcc options in send.
Deep Dive: Use N/render to attach a PDF instead of a text file.
 */

define(['N/email', 'N/file', 'N/log', 'N/record'], function(email, file, log, record) {
    function afterSubmit(scriptContext) {
        var order = scriptContext.newRecord;
        var orderId = order.id;
        var salesRepId = order.getValue('salesrep');
        var customerId = order.getValue('entity');

        // Create an attachment
        var attachment = file.create({
            name: 'order_summary_' + orderId + '.txt',
            fileType: file.Type.PLAINTEXT,
            contents: 'Sales Order ID: ' + orderId + '\nTotal: ' + order.getValue('total'),
            folder: -15
        });

        // Single email to sales rep with attachment
        email.send({
            author: 123, // Replace with your employee ID
            recipients: salesRepId, // Sales rep entity ID
            subject: 'Sales Order ' + orderId + ' Assigned',
            body: 'You are assigned to Sales Order ID: ' + orderId + '. See attached details.',
            attachments: [attachment]
        });

        // Bulk emails to customer and supervisor
        email.sendBulk({
            emails: [
                {
                    author: 123,
                    recipients: customerId, // Customer entity ID
                    subject: 'Your Sales Order ' + orderId,
                    body: 'Thank you for your order! ID: ' + orderId
                },
                {
                    author: 123,
                    recipients: 'supervisor@example.com', // Replace with a valid email
                    subject: 'New Sales Order ' + orderId,
                    body: 'Please review Sales Order ID: ' + orderId
                }
            ]
        });

        log.debug({
            title: 'Notification System',
            details: 'Sent emails for Sales Order ID: ' + orderId
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});