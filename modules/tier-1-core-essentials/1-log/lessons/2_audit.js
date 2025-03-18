/**
 * Lesson 2: Tracking Actions with log.audit
Objective: Use log.audit to record significant script actions or milestones.

Explanation: log.audit logs events that are important for auditing or tracking script progress (e.g., a record update). It’s visible at the AUDIT log level or higher, making it less verbose than debug but more persistent than error. Like debug, it takes title and details. This builds on your debugging skills by introducing log levels.

Deployment/Viewing Instructions:

Save as log2_audit.js in the File Cabinet.
Create or update a User Event Script record, link the file, and deploy to Sales Order.
Set Status to Testing and Log Level to AUDIT (or higher, like DEBUG) in the deployment.
Save a Sales Order and check the Execution Log for the audit entry.

Hands-On Coding Challenge:
Log when a Sales Order’s total exceeds 1000.
 */

define(['N/log'], function(log) {
    function afterSubmit(scriptContext) {
        var total = scriptContext.newRecord.getValue('total');
        if (total > 1000) {
            log.audit({
                title: 'High-Value Order',
                details: 'Sales Order total is ' + total
            });
        }
    }
    return {
        afterSubmit: afterSubmit
    };
});