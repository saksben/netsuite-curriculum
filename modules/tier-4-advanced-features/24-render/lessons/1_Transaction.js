/**
 * Lesson 1: Creating a PDF from a Transaction with render.Transaction
Objective: Learn to generate a PDF from a transaction using render.Transaction.

Explanation: render.transaction creates a Transaction renderer for a specific transaction (e.g., Sales Order) using its id and entityId (optional for customer-specific layouts). The toPDF method converts it to a PDF File object. This is a quick way to render standard transaction forms without custom templates.

Deployment/Viewing Instructions:

Save the script file (e.g., render1_transaction.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script record (Customization > Scripting > Scripts > New), set Script Type to Suitelet, and link your file.
Deploy it (Customization > Scripting > Script Deployments), set Status to Released, and note the External URL.
Open the URL, then check the File Cabinet (Documents > Files > SuiteScripts) for the PDF and the Execution Log for confirmation.
Hands-On Coding Challenge:
Generate a PDF for a Sales Order and save it.
 */

define(['N/render', 'N/file', 'N/log'], function(render, file, log) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var renderer = render.transaction({
            entityId: salesOrderId,
            printMode: render.PrintMode.PDF
        });
        var pdfFile = renderer.toPDF();
        pdfFile.name = 'sales_order_' + salesOrderId + '.pdf';
        pdfFile.folder = -15; // SuiteScripts folder
        var fileId = pdfFile.save();
        log.debug({
            title: 'PDF Generated',
            details: 'Sales Order PDF File ID: ' + fileId
        });
        scriptContext.response.write('PDF generated. Check SuiteScripts folder.');
    }
    return {
        onRequest: onRequest
    };
});