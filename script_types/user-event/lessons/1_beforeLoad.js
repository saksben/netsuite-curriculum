/**
 * Lesson 1.1: Modifying Form Load with beforeLoad
Objective: Use beforeLoad to set a default field value when a Sales Order form loads.

Explanation: The beforeLoad entry point runs before the record form is displayed, receiving scriptContext with newRecord, type (create/edit/view), and form. It’s ideal for setting defaults or modifying the UI. This lesson sets a default memo in create mode.

Deployment/Viewing Instructions:

Save as ue_beforeload.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a User Event Script (Customization > Scripting > Scripts > New), set Script Type to User Event, link the file, and deploy to Sales Order (Status: Testing).
Create a new Sales Order, check the Memo field, and verify the Execution Log.
Hands-On Coding Challenge:
Set the Memo to a timestamp in create mode.
 */

define(['N/log'], function(log) {
    function beforeLoad(scriptContext) {
        if (scriptContext.type === scriptContext.UserEventType.CREATE) {
            var newRecord = scriptContext.newRecord;
            newRecord.setValue({
                fieldId: 'memo',
                value: 'Created at ' + new Date().toISOString()
            });
            log.debug({
                title: 'Before Load',
                details: 'Set memo for new Sales Order'
            });
        }
    }
    return { beforeLoad: beforeLoad };
});