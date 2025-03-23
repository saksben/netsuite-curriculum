/**
 * Lesson 3: Retrieving Changed Fields with fieldIds
Objective: Use the fieldIds property to identify which fields triggered a change.

Explanation: The fieldIds property of the RecordContext object (available in fieldChanged) is an array of field IDs that changed, providing insight into user actions. This is useful for reacting to specific field edits in real-time. Note: fieldIds is only populated in the fieldChanged entry point.

Deployment/Viewing Instructions:

Save as rc3_fieldids.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing.
Edit a Sales Order, change a field (e.g., Customer), and check the browser console for the output.
Hands-On Coding Challenge:
Log the IDs of fields that changed when a user edits a Sales Order.
 */

define(['N/recordContext'], function(recordContext) {
    function fieldChanged(scriptContext) {
        var context = recordContext.getContext();
        var changedFields = context.fieldIds;
        if (changedFields && changedFields.length > 0) {
            console.log('Changed Field IDs: ' + changedFields.join(', '));
        } else {
            console.log('No fields changed detected');
        }
    }
    return {
        fieldChanged: fieldChanged
    };
});