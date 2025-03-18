/**
 * Lesson 2: Using TemplateRenderer with create
Objective: Create a custom PDF using render.create and TemplateRenderer.

Explanation: render.create with type: render.RendererType.TEMPLATE returns a TemplateRenderer object, which renders custom FreeMarker templates (stored as strings or files). You set the template with setTemplate and data with addRecord, then use renderAsPdf to generate a PDF. This offers full control over document design.

Deployment/Viewing Instructions:

Save as render2_template.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the File Cabinet for the PDF and the Execution Log.
Hands-On Coding Challenge:
Render a simple custom PDF with a Sales Order’s total.
 */

define(['N/render', 'N/file', 'N/log', 'N/record'], function(render, file, log, record) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });
        var total = salesOrder.getValue('total');

        var renderer = render.create({ type: render.RendererType.TEMPLATE });
        renderer.setTemplate({
            template: '<#ftl><html><body><h1>Sales Order Summary</h1><p>Total: ${total}</p></body></html>'
        });
        renderer.addRecord('record', salesOrder);

        var pdfFile = renderer.renderAsPdf();
        pdfFile.name = 'custom_sales_order_' + salesOrderId + '.pdf';
        pdfFile.folder = -15;
        var fileId = pdfFile.save();
        log.debug({
            title: 'Custom PDF Generated',
            details: 'File ID: ' + fileId
        });
        scriptContext.response.write('Custom PDF generated. Check SuiteScripts folder.');
    }
    return {
        onRequest: onRequest
    };
});