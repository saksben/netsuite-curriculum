/**
 * Lesson 1.1: Initializing the Form with pageInit
Objective: Use pageInit to configure a Sales Order form on load.

Explanation: pageInit runs once when a record form loads (create/edit/view), providing scriptContext with currentRecord and mode. It’s ideal for setting defaults or logging context.

Deployment/Viewing Instructions:

Save as cs_pageinit.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a Client Script (Customization > Scripting > Scripts > New), link the file, deploy to Sales Order (Status: Testing), and apply to your role.
Open a Sales Order, check the browser console (F12 > Console).
Hands-On Coding Challenge:
Set a default Memo in create mode and log the mode.
 */

define(['N/currentRecord'], function(currentRecord) {
    function pageInit(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.mode === 'create') {
            rec.setValue({ fieldId: 'memo', value: 'New Order - ' + new Date().toLocaleDateString() });
        }
        console.log('Form loaded in mode: ' + scriptContext.mode);
    }
    return { pageInit: pageInit };
});