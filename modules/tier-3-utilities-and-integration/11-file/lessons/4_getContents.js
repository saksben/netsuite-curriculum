/**
 * Lesson 4: Reading File Contents with getContents
Objective: Use File.getContents to read the entire contents of a file.

Explanation: getContents returns the file’s contents as a string, ideal for processing or displaying data. It’s a straightforward method on a File object (from create or load), commonly used after loading a file to analyze its data.

Deployment/Viewing Instructions:

Save as file4_getcontents.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order, then check the Execution Log for the file’s full contents.
Hands-On Coding Challenge:
Read and log the entire contents of the Sales Order log file.
 */

define(['N/file', 'N/log'], function(file, log) {
    function afterSubmit(scriptContext) {
        var loadedFile = file.load({
            id: '/SuiteScripts/sales_order_log.txt'
        });
        var contents = loadedFile.getContents();
        log.debug({
            title: 'File Contents',
            details: contents
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});