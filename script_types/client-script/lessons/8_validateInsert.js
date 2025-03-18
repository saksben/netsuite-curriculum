/**
 * Lesson 8.1: Validating Line Inserts with validateInsert
Objective: Use validateInsert to control new sublist line additions.

Explanation: validateInsert runs before a new line is added, returning true to allow or false to block. It limits line entries based on conditions.

Deployment/Viewing Instructions: Same as Lesson 1.1; try adding more than 5 item lines, check for an alert.

Hands-On Coding Challenge:

Limit item lines to 5 maximum.
 */

define(['N/currentRecord', 'N/ui/message'], function(currentRecord, message) {
    function validateInsert(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item') {
            var lineCount = rec.getLineCount({ sublistId: 'item' });
            if (lineCount >= 5) {
                message.create({
                    title: 'Line Limit',
                    message: 'Cannot add more than 5 item lines.',
                    type: message.Type.ERROR
                }).show();
                return false;
            }
        }
        return true;
    }
    return { validateInsert: validateInsert };
});