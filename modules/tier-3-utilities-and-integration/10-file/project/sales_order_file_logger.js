/**
 * Concluding Mini-Project: Sales Order File Logger
Objective: Build a script that uses all N/file sub-subjects (create, load, appendLine, getContents, folder) to maintain a persistent log of Sales Order activity.

Explanation: This project integrates all N/file methods and properties to create a logging system that tracks Sales Order saves, appends details to an existing file, and stores it in a specific folder. It simulates a real-world use case like audit trails or data exports.

Hands-On Coding Challenge:

Create a script to manage a Sales Order log file with dynamic updates.

Deployment/Viewing Instructions:

Save as file_mini_project.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order multiple times, then check the File Cabinet (Documents > Files > SuiteScripts) for sales_order_activity.txt and the Execution Log for the full contents.
Next Steps
Expand: Pair N/file with N/search to export search results to a CSV file.
Challenge: Add error handling for file size limits (e.g., check size property).
Deep Dive: Explore file.Type options (e.g., CSV, JSON) or methods like delete.
 */

define(['N/file', 'N/log'], function(file, log) {
    function afterSubmit(scriptContext) {
        var filePath = '/SuiteScripts/sales_order_activity.txt';
        var folderId = -15; // SuiteScripts folder
        var rec = scriptContext.newRecord;
        var logEntry = 'Sales Order ID: ' + rec.id + ', Total: ' + rec.getValue('total') + 
                      ', Date: ' + new Date().toISOString();

        // Try to load existing file, or create if it doesn’t exist
        var activityFile;
        try {
            activityFile = file.load({ id: filePath });
        } catch (e) {
            activityFile = file.create({
                name: 'sales_order_activity.txt',
                fileType: file.Type.PLAINTEXT,
                contents: 'Sales Order Activity Log\n',
                folder: folderId
            });
        }

        // Append new entry
        activityFile.appendLine({
            value: logEntry
        });

        // Save the updated file
        var fileId = activityFile.save();

        // Read and log the full contents
        var updatedContents = activityFile.getContents();
        log.debug({
            title: 'Activity Log Updated',
            details: 'File ID: ' + fileId + '\nContents:\n' + updatedContents
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});