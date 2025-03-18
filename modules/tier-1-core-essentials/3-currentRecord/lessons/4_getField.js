/**
 * Lesson 4: Inspecting Fields with getField
Objective: Use getField to access field metadata and properties.

Explanation: getField returns a Field object for a given fieldId, with properties like isDisabled, isMandatory, or label. It’s useful for checking field states or conditionally enabling/disabling fields in the UI.

Deployment/Viewing Instructions:

Save as cr4_getfield.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing.
Load a Sales Order and check the browser console for field details.
Hands-On Coding Challenge:
Log whether the Memo field is mandatory and its label on page load.
 */

define(['N/currentRecord'], function(currentRecord) {
    function pageInit(scriptContext) {
        var rec = currentRecord.get();
        var memoField = rec.getField('memo');
        console.log('Memo Field - Mandatory: ' + memoField.isMandatory + 
                    ', Label: ' + memoField.label);
    }
    return {
        pageInit: pageInit
    };
});