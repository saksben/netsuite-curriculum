/**
 * Lesson 1: Sending a Basic Email with send
Objective: Learn to send a simple email using email.send.

Explanation: email.send sends an email with required options like author (sender’s internal employee ID), recipients (email addresses or entity IDs), subject, and body. It’s the core method for single-email notifications. Use your employee ID (found under Employees > Search in NetSuite) as the author, and test with your own email or a colleague’s for safety in the sandbox.

Deployment/Viewing Instructions:

Save the script file (e.g., email1_send.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a User Event Script record (Customization > Scripting > Scripts > New), set Script Type to User Event Script, and link your file.
Deploy it to Sales Order (Customization > Scripting > Script Deployments), set Status to Testing, and apply it to your user role.
Save a Sales Order, then check your inbox (or the recipient’s) and the Execution Log for confirmation.
Hands-On Coding Challenge:
Send an email when a Sales Order is saved.
 */

define(['N/email', 'N/log'], function(email, log) {
    function afterSubmit(scriptContext) {
        email.send({
            author: 123, // Replace with your employee ID
            recipients: 'your.email@example.com', // Replace with your email
            subject: 'Sales Order Saved',
            body: 'A Sales Order (ID: ' + scriptContext.newRecord.id + ') was saved.'
        });
        log.debug({
            title: 'Email Sent',
            details: 'Notification sent for Sales Order ID: ' + scriptContext.newRecord.id
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});