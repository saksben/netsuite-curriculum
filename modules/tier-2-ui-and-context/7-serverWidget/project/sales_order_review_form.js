/**
* Concluding Mini-Project: Custom Sales Order Review Form
Objective: Build a Suitelet that uses all N/ui/serverWidget sub-subjects (createForm, addField, addButton, addSublist, updateDisplayType) to create a review form for Sales Order data.

Explanation: This project integrates all methods to create a custom form with fields, a button, and a sublist, simulating a practical use case like reviewing Sales Order details. You’ll add a read-only field, an interactive button, and a sublist for line items, tying everything together.

Hands-On Coding Challenge:

Create a Suitelet form to display a Sales Order summary with a button to log data. 

Deployment/Viewing Instructions:

Save both files (sw_mini_project.js and sw_mini_client.js) in the File Cabinet.
Deploy the Suitelet with Status: Released.
Open the External URL, interact with the form (e.g., click the button), and check the browser console (F12) for logs.
Next Steps
Expand: Pair N/ui/serverWidget with N/search to populate the sublist with real Sales Order data.
Challenge: Add a submit button to process form input and save it to a record.
Deep Dive: Explore addFieldGroup or updateLayoutType for advanced form styling.
*/

define(['N/ui/serverWidget'], function(serverWidget) {
    function onRequest(scriptContext) {
        // Create the form
        var form = serverWidget.createForm({
            title: 'Sales Order Review'
        });

        // Add a disabled field for order total
        var totalField = form.addField({
            id: 'custpage_order_total',
            type: serverWidget.FieldType.CURRENCY,
            label: 'Order Total'
        });
        totalField.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.DISABLED
        });
        totalField.defaultValue = '1500.00'; // Example value

        // Add a sublist for line items
        var sublist = form.addSublist({
            id: 'custpage_order_lines',
            type: serverWidget.SublistType.INLINEEDITOR,
            label: 'Line Items'
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

        // Add a button to log data
        form.addButton({
            id: 'custpage_review_button',
            label: 'Review Order',
            functionName: 'onReviewClick'
        });
        form.clientScriptModulePath = './sw_mini_client.js';

        scriptContext.response.writePage(form);
    }
    return {
        onRequest: onRequest
    };
});

// Client script sw_mini_client.js

define([], function() {
    function onReviewClick() {
        console.log('Reviewing Order - Total: ' + 
                    document.getElementById('custpage_order_total').value);
        alert('Order reviewed! Check the console for details.');
    }
    return {
        onReviewClick: onReviewClick
    };
});