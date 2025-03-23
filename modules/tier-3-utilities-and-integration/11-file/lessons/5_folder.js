/**
 * Lesson 5: Setting File Properties with folder
Objective: Control the file’s storage location using the folder property.

Explanation: The folder property on a File object sets the File Cabinet folder ID where the file is stored (e.g., -15 for SuiteScripts). You can change it before saving to organize files, making it a key property for file management. Folder IDs are found in the File Cabinet UI.

Deployment/Viewing Instructions:

Save as file5_folder.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order, then check the specified folder in the File Cabinet (Documents > Files) for the new file.
Hands-On Coding Challenge:
Create a file in a custom folder (e.g., a folder you’ve created with ID 123).
 */

define(['N/file', 'N/log'], function(file, log) {
    function afterSubmit(scriptContext) {
        var newFile = file.create({
            name: 'custom_sales_log.txt',
            fileType: file.Type.PLAINTEXT,
            contents: 'Sales Order processed',
            folder: 123 // Replace with a valid folder ID from your sandbox
        });
        var fileId = newFile.save();
        log.debug({
            title: 'File Created in Custom Folder',
            details: 'File ID: ' + fileId
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});