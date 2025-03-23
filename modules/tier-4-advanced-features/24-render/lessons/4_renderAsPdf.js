/**
 * Lesson 4: Rendering to Email with renderAsPdf (Integration)
Objective: Generate a PDF and attach it to an email using renderAsPdf.

Explanation: renderAsPdf produces a PDF File object from a TemplateRenderer, which can be attached to an email via N/email. This combines rendering with communication, a common use case for sending custom documents to users or customers.

Deployment/Viewing Instructions:

Save as render4_email.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check your inbox for the email with the PDF and the Execution Log.
Hands-On Coding Challenge:
Render a PDF and email it to yourself.
 */

define(['N/render', 'N/email', 'N/log', 'N/record'], function(render, email, log, record) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });

        var renderer = render.create({ type: render.RendererType.TEMPLATE });
        renderer.setTemplate({
            template: '<#ftl><html><body><h1>Order Confirmation</h1><p>ID: ${record.id}</p></body></html>'
        });
        renderer.addRecord('record', salesOrder);

        var pdfFile = renderer.renderAsPdf();
        pdfFile.name = 'confirmation_' + salesOrderId + '.pdf';
        pdfFile.folder = -15;
        var fileId = pdfFile.save();

        email.send({
            author: 456, // Replace with your employee ID
            recipients: 'your.email@example.com', // Replace with your email
            subject: 'Sales Order Confirmation',
            body: 'Attached is your Sales Order confirmation.',
            attachments: [pdfFile]
        });

        log.debug({
            title: 'PDF Emailed',
            details: 'File ID: ' + fileId + ' sent to email.'
        });
        scriptContext.response.write('PDF emailed. Check your inbox.');
    }
    return {
        onRequest: onRequest
    };
});