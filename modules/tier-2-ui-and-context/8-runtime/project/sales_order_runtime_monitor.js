/**
 * Concluding Mini-Project: Sales Order Runtime Monitor
Objective: Build a script that uses all N/runtime sub-subjects (getCurrentScript, getCurrentUser, envType, executionContext, getCurrentSession) to monitor and log Sales Order interactions.

Explanation: This project integrates all runtime methods to create a comprehensive monitoring tool, tracking script details, user info, environment, context, and session data. It simulates a real-world use case like auditing user actions or debugging deployments.

Hands-On Coding Challenge:

Create a Client Script to log a detailed runtime summary when a Sales Order field changes.


Deployment/Viewing Instructions:

Save as rt_mini_project.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing.
Open a Sales Order, change a field (e.g., customer), and check the Execution Log for the detailed runtime summary.
Next Steps
Expand: Pair N/runtime with N/ui/dialog to alert users based on role or context.
Challenge: Use getParameter on the Script object to read a custom script parameter.
Deep Dive: Explore runtime.accountId or runtime.version for additional system info.
 */

define(['N/runtime', 'N/log'], function(runtime, log) {
    function pageInit(scriptContext) {
        var script = runtime.getCurrentScript();
        var user = runtime.getCurrentUser();
        var env = runtime.envType;
        var context = runtime.executionContext;
        var session = runtime.getCurrentSession();

        // Initialize session counter
        session.set({
            key: 'orderViews',
            value: 0
        });

        log.debug({
            title: 'Page Init Runtime',
            details: 'Script ID: ' + script.id + ', User: ' + user.name + 
                     ', Env: ' + env + ', Context: ' + context
        });
    }

    function fieldChanged(scriptContext) {
        var script = runtime.getCurrentScript();
        var user = runtime.getCurrentUser();
        var env = runtime.envType;
        var context = runtime.executionContext;
        var session = runtime.getCurrentSession();

        // Update session view counter
        var orderViews = session.get({ key: 'orderViews' }) || 0;
        orderViews = parseInt(orderViews) + 1;
        session.set({
            key: 'orderViews',
            value: orderViews
        });

        var summary = 'Field Changed Runtime:\n' +
                      'Script ID: ' + script.id + ', Deployment: ' + script.deploymentId + '\n' +
                      'User ID: ' + user.id + ', Name: ' + user.name + ', Role: ' + user.role + '\n' +
                      'Environment: ' + env + '\n' +
                      'Context: ' + context + '\n' +
                      'Session Views: ' + orderViews;
        
        log.debug({
            title: 'Runtime Monitor',
            details: summary
        });
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    };
});