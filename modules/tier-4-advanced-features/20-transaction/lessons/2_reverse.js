/**
 * Lesson 2: Reversing a Transaction with reverse
Objective: Use transaction.reverse to create a reversing transaction.

Explanation: transaction.reverse generates a new transaction (e.g., a Credit Memo for an Invoice) to offset the original’s financial impact, rather than voiding it. It requires type (e.g., INVOICE) and id, and optional parameters like reverseDate (a Date object or string). This preserves audit trails, unlike voiding. Test with an Invoice in your sandbox.

Deployment/Viewing Instructions:

Save as tran2_reverse.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Invoice (Transactions > Sales > Create Invoices > List) and its related Credit Memo, plus the Execution Log.
Hands-On Coding Challenge:
Reverse an Invoice with a specific date.
 */

define(['N/transaction', 'N/log', 'N/record'], function(transaction, log, record) {
    function onRequest(scriptContext) {
        var invoiceId = 2001; // Replace with a valid Invoice ID from your sandbox
        transaction.reverse({
            type: record.Type.INVOICE,
            id: invoiceId,
            reverseDate: '03/17/2025' // Current date from prompt
        });
        log.debug({
            title: 'Transaction Reversed',
            details: 'Invoice ID: ' + invoiceId + ' reversed with date 03/17/2025.'
        });
        scriptContext.response.write('Invoice reversed. Check the record and logs.');
    }
    return {
        onRequest: onRequest
    };
});