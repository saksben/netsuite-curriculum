/**
 * Concluding Mini-Project: User Account Management Tool
Objective: Build a Suitelet that uses all N/auth sub-subjects (changePassword, changeEmail, initiateLogin) to manage the current user’s authentication settings.

Explanation: This project integrates all N/auth methods to create a simple account management tool: updating the password, changing the email, and generating a login URL for re-authentication. It simulates a real-world use case like a self-service security update interface in a custom Suitelet. Note that initiateLogin is included for completeness, but its full effect depends on SSO setup.

Hands-On Coding Challenge:

Create a Suitelet to update password, email, and provide a login URL.

Deployment/Viewing Instructions:

Save as auth_mini_project.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the form for status messages, your inbox/profile for email changes, and the Execution Log for details. Log in with the new password to verify.
Next Steps
Expand: Pair N/auth with N/email to notify users of changes.
Challenge: Add form fields to accept currentPassword and newEmail dynamically.
Deep Dive: Explore SSO setup requirements for initiateLogin in a production-like scenario.
 */

define(['N/auth', 'N/log', 'N/ui/serverWidget'], function(auth, log, serverWidget) {
    function onRequest(scriptContext) {
        var form = serverWidget.createForm({
            title: 'Account Management Tool'
        });

        // Step 1: Change Password
        try {
            auth.changePassword({
                currentPassword: 'NewPassword456!', // Replace with your current password
                newPassword: 'SecurePass789!'       // Replace with a new password
            });
            log.debug({
                title: 'Password Updated',
                details: 'New password set successfully.'
            });
            form.addField({
                id: 'custpage_status',
                type: serverWidget.FieldType.TEXT,
                label: 'Password Status'
            }).defaultValue = 'Password updated.';
        } catch (e) {
            log.error({ title: 'Password Error', details: e.message });
        }

        // Step 2: Change Email
        try {
            auth.changeEmail({
                password: 'SecurePass789!', // Match the new password above
                newEmail: 'updated.email@example.com' // Replace with a unique email
            });
            log.debug({
                title: 'Email Updated',
                details: 'New email set to updated.email@example.com'
            });
            form.addField({
                id: 'custpage_email_status',
                type: serverWidget.FieldType.TEXT,
                label: 'Email Status'
            }).defaultValue = 'Email updated.';
        } catch (e) {
            log.error({ title: 'Email Error', details: e.message });
        }

        // Step 3: Generate Login URL
        var loginInfo = auth.initiateLogin({
            redirectUri: 'https://your-sandbox.netsuite.com' // Replace with a valid URI
        });
        log.debug({
            title: 'Login URL',
            details: 'Generated URL: ' + loginInfo.url
        });
        form.addField({
            id: 'custpage_login_url',
            type: serverWidget.FieldType.URL,
            label: 'Re-login URL'
        }).defaultValue = loginInfo.url;

        scriptContext.response.writePage(form);
    }
    return {
        onRequest: onRequest
    };
});