/**
 * Concluding Mini-Project: Sales Order Status Updater
Objective: Build a Scheduled Script using execute to update Sales Order statuses, handle governance with rescheduling, and log results to a file.

Explanation: Integrates the execute entry point with governance management and file output, simulating a real-world batch process to update Sales Orders older than 30 days to a “Reviewed” status (using a custom field). It reschedules if governance limits are approached and saves a summary to the File Cabinet.

Hands-On Coding Challenge:

Create a Scheduled Script to mark old Sales Orders as reviewed, reschedule if needed, and generate a report file.

Deployment/Viewing Instructions:

Save as ss_sales_order_updater.js in the File Cabinet.
Deploy as a Scheduled Script (same as Lesson 1.1).
Schedule or execute manually, then check:
Execution Log for processing and rescheduling details.
Script Queue for rescheduled tasks if triggered.
File Cabinet (Documents > Files > SuiteScripts) for the summary file.
Sales Orders for updated custbody_review_status.
Notes
Custom Field: Replace custbody_review_status with a valid custom field ID (e.g., a text or list field) in your sandbox; create one if needed (Customization > Lists, Records & Fields > Transaction Body Fields > New).
Governance: The reschedule threshold (1000 units) is arbitrary; adjust based on your script’s complexity.
Permissions: Ensure your role can edit Sales Orders and write files.
Next Steps: Add email notifications (N/email) for completion, or parameterize the date range via script parameters.
 */

define(['N/search', 'N/record', 'N/task', 'N/file', 'N/log'], function(search, record, task, file, log) {
    function execute(scriptContext) {
        var thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        var soSearch = search.create({
            type: 'salesorder',
            filters: [
                ['mainline', 'is', 'T'],
                'AND',
                ['trandate', 'before', thirtyDaysAgo]
            ],
            columns: ['internalid', 'trandate', 'total']
        });

        var processedIds = [];
        var count = 0;
        soSearch.run().each(function(result) {
            var soId = result.getValue('internalid');
            var salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id: soId
            });
            salesOrder.setValue({
                fieldId: 'custbody_review_status', // Replace with a valid custom field ID
                value: 'Reviewed'
            });
            salesOrder.save();
            processedIds.push({
                id: soId,
                date: result.getValue('trandate'),
                total: result.getValue('total')
            });
            count++;

            // Reschedule if governance is low
            if (scriptContext.getRemainingUsage() < 1000 && count < 100) {
                var taskObj = task.create({
                    taskType: task.TaskType.SCHEDULED_SCRIPT,
                    scriptId: scriptContext.scriptId, // Replace with your script ID if hardcoded
                    deploymentId: scriptContext.deploymentId
                });
                taskObj.submit();
                log.debug({
                    title: 'Rescheduled',
                    details: 'Processed ' + count + ' records, rescheduling'
                });
                return false; // Stop and reschedule
            }
            return true; // Continue
        });

        // Write results to a file
        var fileContent = 'Processed Sales Orders:\n' + 
            processedIds.map(function(item) {
                return 'ID: ' + item.id + ', Date: ' + item.date + ', Total: ' + item.total;
            }).join('\n');
        var summaryFile = file.create({
            name: 'sales_order_review_' + new Date().getTime() + '.txt',
            fileType: file.Type.PLAINTEXT,
            contents: fileContent,
            folder: -15 // SuiteScripts folder
        });
        var fileId = summaryFile.save();

        log.debug({
            title: 'Batch Complete',
            details: 'Processed ' + count + ' Sales Orders, File ID: ' + fileId
        });
    }
    return { execute: execute };
});