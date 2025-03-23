/**
 * Lesson 3: Appending Data with appendLine
Objective: Modify a file by adding lines using File.appendLine.

Explanation: appendLine (available on a loaded File object) adds a new line to a text file’s contents, useful for logging incremental updates. After appending, you save the file with save. This method works only with certain file types like PLAINTEXT.

Deployment/Viewing Instructions:

Save as file3_append.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order multiple times, then check the file in the File Cabinet for updated contents.
Hands-On Coding Challenge:
Append a Sales Order ID to an existing file.
 */

define(['N/file', 'N/log'], function(file, log) {
    function afterSubmit(scriptContext) {
        var loadedFile = file.load({
            id: '/SuiteScripts/sales_order_log.txt'
        });
        loadedFile.appendLine({
            value: 'Sales Order ID: ' + scriptContext.newRecord.id
        });
        var fileId = loadedFile.save();
        log.debug({
            title: 'Line Appended',
            details: 'Updated File ID: ' + fileId
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});