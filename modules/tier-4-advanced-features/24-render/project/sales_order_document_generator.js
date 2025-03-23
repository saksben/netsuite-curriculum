/**
 * Concluding Mini-Project: Sales Order Document Generator
Objective: Build a Suitelet that uses all N/render sub-subjects (create, TemplateRenderer, Transaction, toPDF, renderAsPdf) to generate and distribute Sales Order PDFs in multiple ways.

Explanation: This project integrates all N/render methods to create a versatile document generator: one PDF from a standard transaction form, another from a custom template, and a third emailed using a saved template. It simulates a real-world use case like producing and distributing order confirmations.

Hands-On Coding Challenge:

Create a Suitelet to generate three Sales Order PDFs with different methods.

Deployment/Viewing Instructions:

Save as render_mini_project.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the File Cabinet for three PDFs (Documents > Files > SuiteScripts), your inbox for the emailed PDF, and the Execution Log for details.
Next Steps
Expand: Pair N/render with N/search to render PDFs for multiple records.
Challenge: Add custom FreeMarker logic (e.g., loops) in the template for line items.
Deep Dive: Explore render.PrintMode.HTML or addCustomData for advanced rendering.
 */

define(['N/render', 'N/file', 'N/email', 'N/log', 'N/record'], function(render, file, email, log, record) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });

        // Step 1: Standard Transaction PDF
        var tranRenderer = render.transaction({
            entityId: salesOrderId,
            printMode: render.PrintMode.PDF
        });
        var tranPdf = tranRenderer.toPDF();
        tranPdf.name = 'standard_so_' + salesOrderId + '.pdf';
        tranPdf.folder = -15;
        var tranFileId = tranPdf.save();
        log.debug({
            title: 'Standard PDF',
            details: 'File ID: ' + tranFileId
        });

        // Step 2: Custom Template PDF
        var customRenderer = render.create({ type: render.RendererType.TEMPLATE });
        customRenderer.setTemplate({
            template: '<#ftl><html><body><h1>Sales Order ${record.id}</h1><p>Total: ${record.total}</p></body></html>'
        });
        customRenderer.addRecord('record', salesOrder);
        var customPdf = customRenderer.renderAsPdf();
        customPdf.name = 'custom_so_' + salesOrderId + '.pdf';
        customPdf.folder = -15;
        var customFileId = customPdf.save();
        log.debug({
            title: 'Custom Template PDF',
            details: 'File ID: ' + customFileId
        });

        // Step 3: Saved Template PDF with Email
        var emailRenderer = render.create({ type: render.RendererType.TEMPLATE });
        emailRenderer.setTemplateById({
            id: 123 // Replace with a valid Advanced PDF/HTML Template ID
        });
        emailRenderer.addRecord('record', salesOrder);
        var emailPdf = emailRenderer.renderAsPdf();
        emailPdf.name = 'email_so_' + salesOrderId + '.pdf';
        emailPdf.folder = -15;
        var emailFileId = emailPdf.save();

        email.send({
            author: 456, // Replace with your employee ID
            recipients: 'your.email@example.com',
            subject: 'Sales Order ' + salesOrderId + ' PDF',
            body: 'Attached is your custom Sales Order PDF.',
            attachments: [emailPdf]
        });
        log.debug({
            title: 'Emailed PDF',
            details: 'File ID: ' + emailFileId + ' sent.'
        });

        scriptContext.response.write('PDFs generated and emailed. Check SuiteScripts folder and inbox.');
    }
    return {
        onRequest: onRequest
    };
});