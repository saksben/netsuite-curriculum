/**
 * Lesson 7.1: Initializing Sublist Lines with lineInit
Objective: Use lineInit to set defaults for sublist lines.

Explanation: lineInit triggers when a line is selected for editing, allowing initialization of line fields.

Deployment/Viewing Instructions: Same as Lesson 1.1; click an item line, check Description.

Hands-On Coding Challenge:

Set a default Description on line initialization.
 */

define(['N/currentRecord'], function(currentRecord) {
    function lineInit(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item') {
            var currentDesc = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'description'
            });
            if (!currentDesc) {
                rec.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'description',
                    value: 'Default Line Item'
                });
            }
        }
    }
    return { lineInit: lineInit };
});