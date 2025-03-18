/**
 * Lesson 2: Loading an Existing File with load
Objective: Use file.load to retrieve an existing file from the File Cabinet.

Explanation: file.load loads a file by its id or path (e.g., /SuiteScripts/myfile.txt), returning a File object. You can then access properties like name, size, or contents. This is essential for reading or modifying existing files. File IDs are visible in the File Cabinet URL or via search.

Deployment/Viewing Instructions:

Save as file2_load.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order, then check the Execution Log for the file’s contents (create the file from Lesson 1 first if needed).
Hands-On Coding Challenge:
Load the file from Lesson 1 and log its contents.
 */

define(['N/file', 'N/log'], function(file, log) {
    function afterSubmit(scriptContext) {
        var loadedFile = file.load({
            id: '/SuiteScripts/sales_order_log.txt' // Adjust path or use file ID
        });
        log.debug({
            title: 'File Loaded',
            details: 'Contents: ' + loadedFile.getContents()
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});