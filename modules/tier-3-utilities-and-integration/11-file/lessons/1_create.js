/**
 * Lesson 1: Creating a New File with create
Objective: Learn to create a text file using file.create.

Explanation: file.create generates a new File object with properties like name, fileType (e.g., file.Type.PLAINTEXT), contents, and folder (the File Cabinet folder ID). You save it with the save method. This is the starting point for file operations, useful for logging or exporting data. Folder IDs can be found in the File Cabinet (Documents > Files > File Cabinet).
Can upload files to the File Cabinet, and send files as attachments without uploading to the File Cabinet. Methods that load content in memory have a 10mb size limit (not applicable when streamed, ex. File.save())
All files are screened for malicious content when uploaded or updated. Consider splitting large files into smaller ones to increase performance.

Deployment/Viewing Instructions:

Save the script file (e.g., file1_create.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a User Event Script record (Customization > Scripting > Scripts > New), set Script Type to User Event Script, and link your file.
Deploy it to Sales Order (Customization > Scripting > Script Deployments), set Status to Testing, and apply it to your user role.
Save a Sales Order, then check the File Cabinet (Documents > Files > SuiteScripts) for the new file.
Hands-On Coding Challenge:
Create a text file with a simple message when a Sales Order is saved.
 */

define(['N/file', 'N/log'], function(file, log) {
    function afterSubmit(scriptContext) {
        var newFile = file.create({
            name: 'sales_order_log.txt',
            fileType: file.Type.PLAINTEXT,
            contents: 'Sales Order saved on ' + new Date().toISOString(),
            folder: -15 // SuiteScripts folder ID (default: -15)
        });
        var fileId = newFile.save();
        log.debug({
            title: 'File Created',
            details: 'File ID: ' + fileId
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});