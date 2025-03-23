/**
 * Lesson 4: Identifying Sublist Changes with sublistId
Objective: Use the sublistId property to detect changes in sublists.

Explanation: The sublistId property of the RecordContext object (available in fieldChanged or sublistChanged) indicates the sublist (e.g., item) where a change occurred. This complements fieldIds by pinpointing sublist-level interactions, crucial for line-item management.

Deployment/Viewing Instructions:

Save as rc4_sublistid.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing.
Edit a Sales Order, change a sublist field (e.g., Quantity on an item line), and check the browser console.
Hands-On Coding Challenge:
Log the sublist ID when a sublist field changes.
 */

define(['N/recordContext'], function(recordContext) {
    function fieldChanged(scriptContext) {
        var context = recordContext.getContext();
        var sublist = context.sublistId;
        if (sublist) {
            console.log('Sublist Changed: ' + sublist);
        }
    }
    return {
        fieldChanged: fieldChanged
    };
});