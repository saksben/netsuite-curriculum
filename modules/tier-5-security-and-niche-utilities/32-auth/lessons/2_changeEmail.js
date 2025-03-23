/**
 * Lesson 2: Updating a User’s Email with changeEmail
Objective: Use auth.changeEmail to modify the current user’s email address.

Explanation: auth.changeEmail updates the email address associated with the current user’s account, requiring password (current password) and newEmail. This can be used for profile updates or security workflows. It’s tied to the logged-in user, so test with your own account in the sandbox, ensuring the new email is unique and valid.

Deployment/Viewing Instructions:

Save as auth2_email.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log and your user profile (Home > Set Preferences > General) to verify the email change.
Hands-On Coding Challenge:
Change your email address to a new value.
 */

define(['N/auth', 'N/log'], function(auth, log) {
    function onRequest(scriptContext) {
        auth.changeEmail({
            password: 'NewPassword456!', // Replace with your current password (from Lesson 1 if changed)
            newEmail: 'new.email@example.com' // Replace with a unique test email
        });
        log.debug({
            title: 'Email Changed',
            details: 'User email updated to new.email@example.com'
        });
        scriptContext.response.write('Email changed. Check logs and preferences.');
    }
    return {
        onRequest: onRequest
    };
});