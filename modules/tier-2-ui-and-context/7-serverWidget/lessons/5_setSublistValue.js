/**
 * Lesson 5: Populating Sublist Data
Objective: Populate a sublist with data using setSublistValue.

Explanation: After creating a sublist, setSublistValue adds data to specific lines, taking id (sublist ID), fieldId, line (index), and value. This is key for displaying dynamic data (e.g., from a search or record).

Deployment/Viewing Instructions:

Save as sw5_populatesublist.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Access the Suitelet URL to see the populated sublist.
Hands-On Coding Challenge:
Populate the sublist with sample item data.
 */

define(['N/ui/serverWidget'], function(serverWidget) {
    function onRequest(scriptContext) {
        var form = serverWidget.createForm({
            title: 'Populated Item List'
        });
        var sublist = form.addSublist({
            id: 'custpage_items',
            type: serverWidget.SublistType.LIST,
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
        // Populate data
        sublist.setSublistValue({
            id: 'custpage_item_name',
            line: 0,
            value: 'Widget A'
        });
        sublist.setSublistValue({
            id: 'custpage_quantity',
            line: 0,
            value: 10
        });
        scriptContext.response.writePage(form);
    }
    return {
        onRequest: onRequest
    };
});