/**
 * Lesson 2: Adding Fields with addField
Objective: Use addField to add custom fields to a form.

Explanation: addField adds a field to a Form object, taking parameters like id (e.g., custpage_myfield), type (from serverWidget.FieldType, like TEXT or DATE), and label. Fields can enhance data entry or display on forms.

Deployment/Viewing Instructions:

Save as sw2_addfield.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Access the Suitelet URL in your browser to see the form with a field.
Hands-On Coding Challenge:
Add a text field to the form for entering a note.
 */

define(['N/ui/serverWidget'], function(serverWidget) {
    function onRequest(scriptContext) {
        var form = serverWidget.createForm({
            title: 'Note Entry Form'
        });
        form.addField({
            id: 'custpage_note',
            type: serverWidget.FieldType.TEXT,
            label: 'Enter Note'
        });
        scriptContext.response.writePage(form);
    }
    return {
        onRequest: onRequest
    };
});