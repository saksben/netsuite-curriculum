/**
 * Lesson 1: Voiding a Transaction with void
Objective: Learn to void a transaction using transaction.void.

Explanation: transaction.void cancels a transaction, setting its status to voided (e.g., a Sales Order becomes "Voided"). It requires an object with type (from record.Type, e.g., SALES_ORDER) and id (the transaction’s internal ID). Voiding is permanent and removes financial impact, useful for correcting errors. Test in your sandbox with a disposable transaction.
Transaction voids transactions

Deployment/Viewing Instructions:

Save the script file (e.g., tran1_void.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script record (Customization > Scripting > Scripts > New), set Script Type to Suitelet, and link your file.
Deploy it (Customization > Scripting > Script Deployments), set Status to Released, and note the External URL.
Open the URL, then check the Sales Order (Transactions > Sales > Enter Sales Orders > List) to confirm it’s voided, and the Execution Log for confirmation.
Hands-On Coding Challenge:
Void a specific Sales Order from a Suitelet.
 */

define(['N/transaction', 'N/log', 'N/record'], function(transaction, log, record) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID from your sandbox
        transaction.void({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });
        log.debug({
            title: 'Transaction Voided',
            details: 'Sales Order ID: ' + salesOrderId + ' has been voided.'
        });
        scriptContext.response.write('Sales Order voided. Check the record and logs.');
    }
    return {
        onRequest: onRequest
    };
});