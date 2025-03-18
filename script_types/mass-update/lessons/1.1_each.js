/**
 * Lesson 1.1: Basic Update with each
Objective: Use each to update a Sales Order field for every record in a mass update batch.

Explanation: The each entry point is the core handler for Mass Update Scripts, called for each record in the batch. It receives a scriptContext object with id, type, and optional parameters. This lesson focuses on a simple field update applied to all Sales Orders in the batch, demonstrating the basic mechanics of mass updates.

Deployment/Viewing Instructions:

Save as mu_basic_each.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a Mass Update Script (Customization > Scripting > Scripts > New), set Script Type to Mass Update, link the file, and deploy (Status: Released).
Create a Mass Update (Customization > Mass Updates > Mass Updates > General), select Record Type: Sales Order, and:
Add a filter (e.g., Main Line is true) to target records.
Add an action: Custom Action, select this script.
Run the Mass Update (Mass Update > Saved Mass Updates), select your update, preview, and execute, then check Sales Orders’ Memo fields and the Execution Log.
Hands-On Coding Challenge:
Set the Memo field to a timestamp for each Sales Order in the batch.
 */

define(['N/record', 'N/log'], function(record, log) {
    function each(scriptContext) {
        var salesOrder = record.load({
            type: scriptContext.type, // SALES_ORDER
            id: scriptContext.id
        });
        salesOrder.setValue({
            fieldId: 'memo',
            value: 'Mass Updated at ' + new Date().toISOString()
        });
        salesOrder.save();
        log.debug({
            title: 'Mass Update Applied',
            details: 'Updated memo for Sales Order ID: ' + scriptContext.id
        });
    }
    return { each: each };
});