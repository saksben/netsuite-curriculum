/**
 * Lesson 1: Changing a User’s Password with changePassword
Objective: Learn to update a user’s password using auth.changePassword.

Explanation: auth.changePassword updates the current user’s password, requiring currentPassword (the existing password) and newPassword. This is useful for forcing password updates programmatically (e.g., after a security event). For testing, use your own account in the sandbox, but ensure you know your current password and have permission to change it (typically tied to your role).

Deployment/Viewing Instructions:

Save the script file (e.g., auth1_password.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script record (Customization > Scripting > Scripts > New), set Script Type to Suitelet, and link your file.
Deploy it (Customization > Scripting > Script Deployments), set Status to Released, and note the External URL.
Open the URL, then check the Execution Log for success and log in with the new password to verify.
Hands-On Coding Challenge:
Change your password to a new value from a Suitelet.
 */

define(['N/auth', 'N/log'], function(auth, log) {
    function onRequest(scriptContext) {
        auth.changePassword({
            currentPassword: 'OldPassword123!', // Replace with your current sandbox password
            newPassword: 'NewPassword456!'     // Replace with a new, valid password
        });
        log.debug({
            title: 'Password Changed',
            details: 'User password updated successfully.'
        });
        scriptContext.response.write('Password changed. Check logs and try logging in.');
    }
    return {
        onRequest: onRequest
    };
});