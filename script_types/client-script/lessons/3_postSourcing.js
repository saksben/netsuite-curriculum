/**
 * Lesson 3.1: Post-Sourcing Updates with postSourcing
Objective: Use postSourcing to adjust fields after sourcing.

Explanation: postSourcing runs after a field sources data (e.g., Customer populates related fields), providing fieldId and currentRecord. It’s useful for post-sourcing tweaks.

Deployment/Viewing Instructions: Same as Lesson 1.1; change Customer, check Memo.

Hands-On Coding Challenge:

Append the customer name to Memo after sourcing.
 */

define(['N/currentRecord'], function(currentRecord) {
    function postSourcing(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.fieldId === 'entity') {
            var customerName = rec.getText('entity');
            var currentMemo = rec.getValue('memo') || '';
            rec.setValue({ 
                fieldId: 'memo', 
                value: currentMemo + ' - Customer: ' + customerName 
            });
            console.log('Post-sourcing: Memo updated with ' + customerName);
        }
    }
    return { postSourcing: postSourcing };
});