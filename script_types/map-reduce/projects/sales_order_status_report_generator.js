/**
 * Concluding Mini-Project: Sales Order Status and Report Generator
Objective: Build a Map/Reduce Script using all entry points to update Sales Order statuses and generate a summary file.

Explanation: Integrates getInputData, map, reduce, and summarize to process Sales Orders older than 30 days, tag them based on total, update their status, and create a summary file in the File Cabinet. This simulates a real-world bulk processing and reporting task.

Hands-On Coding Challenge:

Create a script to tag and update old Sales Orders, then save a summary file.

Deployment/Viewing Instructions:

Save as mr_sales_order_review.js in the File Cabinet.
Deploy as a Map/Reduce Script (same as Lesson 1.1).
Execute manually (Execute Now), then check:
Sales Orders for updated custbody_review_status.
Execution Log for debug and audit entries.
File Cabinet (Documents > Files > SuiteScripts) for the summary file.
Script status (Setup > Scripting > Map/Reduce Script Status) for completion.
Notes
Custom Field: Replace custbody_review_status with a valid custom field ID (e.g., a text or list field); create one if needed (Customization > Lists, Records & Fields > Transaction Body Fields > New).
Performance: Map/Reduce scripts handle large datasets efficiently; adjust filters or limits for testing in a sandbox.
Permissions: Ensure your role can edit Sales Orders and write files.
Next Steps: Add error handling in summarize (summary.mapSummary.errors), or schedule via N/task for recurring execution.
 */

define(['N/search', 'N/record', 'N/log', 'N/file'], function(search, record, log, file) {
    // Fetch Sales Orders older than 30 days
    function getInputData(scriptContext) {
        var thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return search.create({
            type: 'salesorder',
            filters: [
                ['mainline', 'is', 'T'],
                'AND',
                ['trandate', 'before', thirtyDaysAgo]
            ],
            columns: ['internalid', 'trandate', 'total', 'entity']
        });
    }

    // Tag based on total
    function map(scriptContext) {
        var value = JSON.parse(scriptContext.value);
        var soId = value.id;
        var total = parseFloat(value.values.total);
        var tag = total > 1000 ? 'High Value' : 'Standard';
        scriptContext.write({
            key: soId,
            value: { tag: tag, date: value.values.trandate }
        });
    }

    // Update status
    function reduce(scriptContext) {
        var soId = scriptContext.key;
        var data = JSON.parse(scriptContext.values[0]); // Single value per key
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: soId
        });
        salesOrder.setValue({
            fieldId: 'custbody_review_status', // Replace with a valid custom field ID
            value: data.tag
        });
        salesOrder.save();
        log.debug({
            title: 'Reduce Stage',
            details: 'Updated SO ID: ' + soId + ' with status: ' + data.tag
        });
        // Store data for summary
        scriptContext.write({
            key: 'summary',
            value: { id: soId, tag: data.tag, date: data.date }
        });
    }

    // Generate summary file
    function summarize(summary) {
        var processedRecords = [];
        summary.output.iterator().each(function(key, value) {
            if (key === 'summary') {
                processedRecords.push(JSON.parse(value));
            }
            return true;
        });

        var fileContent = 'Processed Sales Orders:\n' + 
            processedRecords.map(function(item) {
                return 'ID: ' + item.id + ', Date: ' + item.date + ', Status: ' + item.tag;
            }).join('\n');
        var summaryFile = file.create({
            name: 'so_review_' + new Date().getTime() + '.txt',
            fileType: file.Type.PLAINTEXT,
            contents: fileContent,
            folder: -15 // SuiteScripts folder
        });
        var fileId = summaryFile.save();

        log.audit({
            title: 'Map/Reduce Complete',
            details: 'Processed ' + processedRecords.length + ' Sales Orders, File ID: ' + fileId
        });
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
});