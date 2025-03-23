/**
 * Lesson 2: Identifying the Current User with getCurrentUser
Objective: Use runtime.getCurrentUser to get details about the user running the script.

Explanation: runtime.getCurrentUser returns a User object with properties like id (internal ID), name, email, and role. This helps tailor script behavior to the user (e.g., restricting actions by role). It’s widely used for personalization or security checks.

Deployment/Viewing Instructions:

Save as rt2_getuser.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order and check the Execution Log for user details.
Hands-On Coding Challenge:
Log the user’s name and role when a Sales Order is saved.
 */

define(['N/runtime', 'N/log'], function(runtime, log) {
    function afterSubmit(scriptContext) {
        var user = runtime.getCurrentUser();
        log.debug({
            title: 'User Info',
            details: 'Name: ' + user.name + ', Role ID: ' + user.role
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});