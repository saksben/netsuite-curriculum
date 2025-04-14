/**
 * Lesson 1: Formatting Dates with format
Objective: Learn to format a JavaScript Date object using format.format.

Explanation: format.format converts a value (e.g., a Date object) into a string based on a type from format.FormatType (e.g., DATETIME, DATE). Options like timezone (from format.TimeZone) can adjust the output. This is essential for displaying dates in user-friendly formats or logs.
Format parses formatted data into strings and converts strings into a specified format according to personal preferences set on the Set Preferences page.

Deployment/Viewing Instructions:

Save the script file (e.g., fmt1_format_date.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a User Event Script record (Customization > Scripting > Scripts > New), set Script Type to User Event Script, and link your file.
Deploy it to Sales Order (Customization > Scripting > Script Deployments), set Status to Testing, and apply it to your user role.
Save a Sales Order, then check the Execution Log for the formatted date.
Hands-On Coding Challenge:
Format the current date and log it when a Sales Order is saved.
 */

define(['N/format', 'N/log'], function(format, log) {
    function afterSubmit(scriptContext) {
        var currentDate = new Date();
        var formattedDate = format.format({
            value: currentDate,
            type: format.FormatType.DATE,
            timezone: format.TimeZone.AMERICA_NEW_YORK
        });
        log.debug({
            title: 'Formatted Date',
            details: 'Current Date: ' + formattedDate
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});