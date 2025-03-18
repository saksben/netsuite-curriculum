/**
 * Concluding Mini-Project: Sales Order Cleanup Mass Update
Objective: Build a Mass Update Script using each to clean up Sales Orders by updating status, logging activity, and creating a summary file based on conditions and parameters.

Explanation: Integrates each with conditional logic, parameters, logging, and file creation to perform a comprehensive cleanup on Sales Orders. It marks orders older than a specified number of days with a status, logs the process, and generates a summary file in the File Cabinet, simulating a real-world bulk maintenance task.

Hands-On Coding Challenge:

Create a script to mark Sales Orders older than a parameter-defined number of days as “Reviewed,” log updates, and save a summary file.

Deployment/Viewing Instructions:

Save as mu_sales_order_cleanup.js in the File Cabinet.
Deploy as a Mass Update Script (same as Lesson 1.1).
In the deployment, add a parameter:
Name: daysThreshold, Type: Integer, Default: 30 (Parameters tab > Add Parameter).
Set up a Mass Update:
Record Type: Sales Order, Filter: Main Line is true.
Add Custom Action, select this script, set Parameters to daysThreshold=30 (or adjust).
Run the Mass Update, then check:
Sales Orders for updated custbody_review_status.
Execution Log for debug and audit entries.
File Cabinet (Documents > Files > SuiteScripts) for the summary file.
Notes
Custom Field: Replace custbody_review_status with a valid custom field ID (e.g., a text or list field); create one if needed (Customization > Lists, Records & Fields > Transaction Body Fields > New).
File Limitation: Mass Update Scripts process records individually, so the file write in the mini-project simulates a single execution summary. For full batch reporting, consider a Scheduled Script instead.
Permissions: Ensure your role can edit Sales Orders and write files.
Next Steps: Add error handling with N/error, or integrate with N/email to notify after completion.
 */

define(['N/record', 'N/log', 'N/file', 'N/search'], function(record, log, file, search) {
    function each(scriptContext) {
        var salesOrder = record.load({
            type: scriptContext.type,
            id: scriptContext.id
        });
        var tranDate = new Date(salesOrder.getValue('trandate'));
        var daysThreshold = parseInt(scriptContext.parameters.daysThreshold, 10) || 30;
        var today = new Date();
        var daysOld = Math.floor((today - tranDate) / (1000 * 60 * 60 * 24));

        var summaryData = [];

        if (daysOld > daysThreshold) {
            salesOrder.setValue({
                fieldId: 'custbody_review_status', // Replace with a valid custom field ID
                value: 'Reviewed'
            });
            salesOrder.save();
            summaryData.push({
                id: scriptContext.id,
                date: salesOrder.getValue('trandate'),
                total: salesOrder.getValue('total')
            });
            log.debug({
                title: 'Sales Order Reviewed',
                details: 'ID: ' + scriptContext.id + ', Days Old: ' + daysOld + ', Threshold: ' + daysThreshold
            });

            // Write summary to a file (runs once per execution, so simulate here)
            var fileContent = 'Reviewed Sales Orders:\n' + 
                summaryData.map(function(item) {
                    return 'ID: ' + item.id + ', Date: ' + item.date + ', Total: ' + item.total;
                }).join('\n');
            var summaryFile = file.create({
                name: 'so_cleanup_' + new Date().getTime() + '.txt',
                fileType: file.Type.PLAINTEXT,
                contents: fileContent,
                folder: -15 // SuiteScripts folder
            });
            var fileId = summaryFile.save();
            log.audit({
                title: 'Summary File Created',
                details: 'File ID: ' + fileId + ', Processed ' + summaryData.length + ' records'
            });
        }
    }
    return { each: each };
});