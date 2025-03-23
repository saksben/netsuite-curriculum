/**
 * Concluding Mini-Project: Transaction Cleanup Tool
Objective: Build a Suitelet that uses all N/transaction sub-subjects (void, reverse, type, id) to clean up test transactions in the sandbox.

Explanation: This project integrates all N/transaction methods and properties to void a Sales Order, reverse an Invoice, and handle a Cash Sale based on conditions, simulating a practical use case like undoing erroneous transactions during testing or cleanup. It ensures you can manage multiple transaction types.

Hands-On Coding Challenge:

Create a Suitelet to void a Sales Order, reverse an Invoice, and void a Cash Sale, logging each action.

Deployment/Viewing Instructions:

Save as tran_mini_project.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Sales Order, Invoice, and Cash Sale records (Transactions > Sales) for voided/reversed statuses, and the Execution Log for details.
Next Steps
Expand: Pair N/transaction with N/email to notify users after voiding/reversing.
Challenge: Add error handling for invalid IDs or unsupported transaction types.
Deep Dive: Explore permissions required for voiding/reversing (e.g., user role constraints).
 */

define(['N/transaction', 'N/log', 'N/record', 'N/search'], function(transaction, log, record, search) {
    function onRequest(scriptContext) {
        // Step 1: Void a Sales Order
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        transaction.void({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });
        log.debug({
            title: 'Sales Order Voided',
            details: 'Sales Order ID: ' + salesOrderId
        });

        // Step 2: Reverse an Invoice
        var invoiceId = 2001; // Replace with a valid Invoice ID
        transaction.reverse({
            type: record.Type.INVOICE,
            id: invoiceId,
            reverseDate: new Date()
        });
        log.debug({
            title: 'Invoice Reversed',
            details: 'Invoice ID: ' + invoiceId + ' reversed on ' + new Date().toISOString()
        });

        // Step 3: Void a Cash Sale if total < 100
        var cashSaleSearch = search.create({
            type: search.Type.CASH_SALE,
            filters: [['mainline', 'is', 'T'], 'AND', ['amount', 'lessthan', 100]],
            columns: ['internalid']
        });
        var cashSaleId;
        cashSaleSearch.run().each(function(result) {
            cashSaleId = result.getValue('internalid');
            transaction.void({
                type: record.Type.CASH_SALE,
                id: cashSaleId
            });
            log.debug({
                title: 'Cash Sale Voided',
                details: 'Cash Sale ID: ' + cashSaleId
            });
            return false; // Stop after first match
        });

        scriptContext.response.write('Transactions processed. Check records and logs.');
    }
    return {
        onRequest: onRequest
    };
});