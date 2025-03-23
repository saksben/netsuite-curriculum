/**
 * Lesson 3: Rendering from a Saved Template
Objective: Use a saved template with TemplateRenderer and templateId.

Explanation: Instead of embedding a template string, setTemplateById uses a saved Advanced PDF/HTML Template (Customization > Forms > Advanced PDF/HTML Templates). The templateId is the internal ID of the template. This leverages pre-designed templates for consistency and complexity. Create a simple template in your sandbox first.

Deployment/Viewing Instructions:

Save as render3_savedtemplate.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the File Cabinet and Execution Log.
Hands-On Coding Challenge:
Render a PDF using a saved template for a Sales Order.
 */

define(['N/render', 'N/file', 'N/log', 'N/record'], function(render, file, log, record) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });

        var renderer = render.create({ type: render.RendererType.TEMPLATE });
        renderer.setTemplateById({
            id: 123 // Replace with a valid Advanced PDF/HTML Template ID
        });
        renderer.addRecord('record', salesOrder);

        var pdfFile = renderer.renderAsPdf();
        pdfFile.name = 'template_sales_order_' + salesOrderId + '.pdf';
        pdfFile.folder = -15;
        var fileId = pdfFile.save();
        log.debug({
            title: 'Saved Template PDF',
            details: 'File ID: ' + fileId
        });
        scriptContext.response.write('PDF from saved template generated.');
    }
    return {
        onRequest: onRequest
    };
});