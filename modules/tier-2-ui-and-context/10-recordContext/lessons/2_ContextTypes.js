/**
 * Lesson 2: Using ContextTypes for Conditional Logic
Objective: Utilize recordContext.ContextTypes to adapt script behavior based on the UI mode.

Explanation: The ContextTypes enum (e.g., recordContext.ContextTypes.CREATE, EDIT, VIEW) defines possible values for contextType. You can use these to execute logic conditionally based on whether the record is being created, edited, or viewed, enhancing user experience or enforcing rules.

Deployment/Viewing Instructions:

Save as rc2_contexttypes.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing.
Create, edit, or view a Sales Order, then check the browser console for the message.
Hands-On Coding Challenge:
Log a custom message depending on the context type when the page loads.
 */

define(['N/recordContext'], function(recordContext) {
    function pageInit(scriptContext) {
        var context = recordContext.getContext();
        var message;
        switch (context.contextType) {
            case recordContext.ContextTypes.CREATE:
                message = 'Creating a new Sales Order';
                break;
            case recordContext.ContextTypes.EDIT:
                message = 'Editing an existing Sales Order';
                break;
            case recordContext.ContextTypes.VIEW:
                message = 'Viewing a Sales Order';
                break;
            default:
                message = 'Unknown context';
        }
        console.log(message);
    }
    return {
        pageInit: pageInit
    };
});