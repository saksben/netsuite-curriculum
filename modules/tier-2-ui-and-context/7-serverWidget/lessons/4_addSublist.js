/**
 * Lesson 4: Creating a Sublist with addSublist
Objective: Use addSublist to add a sublist to a form for tabular data.

Explanation: addSublist creates a sublist (e.g., a table) on a Form object, with id, type (from serverWidget.SublistType, like INLINEEDITOR or LIST), and label. You can then add fields to it with addField. It’s ideal for displaying or editing line items.

Deployment/Viewing Instructions:

Save as sw4_addsublist.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the Suitelet URL to view the form with a sublist.
Hands-On Coding Challenge:
Create a Suitelet form with a sublist for item details.
 */

define(['N/ui/serverWidget'], function(serverWidget) {
    function onRequest(scriptContext) {
        var form = serverWidget.createForm({
            title: 'Item List Form'
        });
        var sublist = form.addSublist({
            id: 'custpage_items',
            type: serverWidget.SublistType.INLINEEDITOR,
            label: 'Items'
        });
        sublist.addField({
            id: 'custpage_item_name',
            type: serverWidget.FieldType.TEXT,
            label: 'Item Name'
        });
        sublist.addField({
            id: 'custpage_quantity',
            type: serverWidget.FieldType.INTEGER,
            label: 'Quantity'
        });
        scriptContext.response.writePage(form);
    }
    return {
        onRequest: onRequest
    };
});