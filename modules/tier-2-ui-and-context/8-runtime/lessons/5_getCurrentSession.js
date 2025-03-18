/**
 * Lesson 5: Managing Session Data with getCurrentSession
Objective: Use runtime.getCurrentSession to store and retrieve session-specific data.

Explanation: runtime.getCurrentSession returns a Session object with methods like get and set to manage key-value pairs for the user’s session. This is useful for temporary data storage (e.g., tracking user actions across page loads). Data persists for the session duration.

Deployment/Viewing Instructions:

Save as rt5_session.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing (since session is more UI-relevant).
Load a Sales Order, interact with it (e.g., change a field), and check the browser console (F12) for session logs.
Hands-On Coding Challenge:
Track and log how many times a field changes in a session.
 */

define(['N/runtime'], function(runtime) {
    function fieldChanged(scriptContext) {
        var session = runtime.getCurrentSession();
        var changeCount = session.get({ key: 'fieldChangeCount' }) || 0;
        changeCount = parseInt(changeCount) + 1;
        session.set({
            key: 'fieldChangeCount',
            value: changeCount
        });
        console.log('Field changed ' + changeCount + ' times this session');
    }
    return {
        fieldChanged: fieldChanged
    };
});