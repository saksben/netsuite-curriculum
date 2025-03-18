/**
 * Lesson 3: Adding Attachments with attachments
Objective: Attach a file to an email using the attachments option.

Explanation: The attachments option in email.send accepts an array of File objects (from N/file). You can create or load files to attach, enhancing emails with documents like PDFs or CSVs. This is great for sending reports or records.

Deployment/Viewing Instructions:

Save as email3_attachments.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order, then check your inbox for the email with the attachment and the Execution Log.
Hands-On Coding Challenge:
Send an email with a text file attachment when a Sales Order is saved.
 */

define(['N/email', 'N/file', 'N/log'], function(email, file, log) {
    function afterSubmit(scriptContext) {
        var attachment = file.create({
            name: 'sales_order_details.txt',
            fileType: file.Type.PLAINTEXT,
            contents: 'Sales Order ID: ' + scriptContext.newRecord.id,
            folder: -15 // SuiteScripts folder
        });
        email.send({
            author: 123, // Replace with your employee ID
            recipients: 'your.email@example.com',
            subject: 'Sales Order with Attachment',
            body: 'See attached details for Sales Order ID: ' + scriptContext.newRecord.id,
            attachments: [attachment]
        });
        log.debug({
            title: 'Email with Attachment',
            details: 'Sent with attachment for Sales Order ID: ' + scriptContext.newRecord.id
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});