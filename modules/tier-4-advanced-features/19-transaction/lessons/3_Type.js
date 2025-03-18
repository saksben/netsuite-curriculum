/**
 * Lesson 3: Using Transaction Types with type
Objective: Apply type from record.Type to handle different transaction types.

Explanation: The type parameter in void and reverse uses record.Type values (e.g., SALES_ORDER, INVOICE, CASH_SALE) to specify the transaction being acted upon. Understanding supported types ensures correct usage, as not all transactions can be voided or reversed (e.g., reversing a Sales Order isn’t typical). This lesson reinforces type specificity.

Deployment/Viewing Instructions:

Save as tran3_types.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Cash Sale (Transactions > Sales > Enter Cash Sales > List) and Execution Log.
Hands-On Coding Challenge:
Void a Cash Sale using its transaction type.
 */

define(['N/transaction', 'N/log', 'N/record'], function(transaction, log, record) {
    function onRequest(scriptContext) {
        var cashSaleId = 3001; // Replace with a valid Cash Sale ID from your sandbox
        transaction.void({
            type: record.Type.CASH_SALE,
            id: cashSaleId
        });
        log.debug({
            title: 'Cash Sale Voided',
            details: 'Cash Sale ID: ' + cashSaleId + ' has been voided.'
        });
        scriptContext.response.write('Cash Sale voided. Check the record and logs.');
    }
    return {
        onRequest: onRequest
    };
});