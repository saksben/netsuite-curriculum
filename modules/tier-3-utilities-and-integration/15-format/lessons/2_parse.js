/**
 * Lesson 2: Parsing Dates with parse
Objective: Use format.parse to convert a string into a Date object.

Explanation: format.parse takes a string value and converts it to a JavaScript Date object based on a type (e.g., DATE, DATETIME). It’s the reverse of format, useful for processing user input or external data into a usable format. The timezone option ensures correct parsing.

Deployment/Viewing Instructions:

Save as fmt2_parse_date.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order, then check the Execution Log for the parsed date.
Hands-On Coding Challenge:
Parse a date string and log it as a Date object.
 */

define(['N/format', 'N/log'], function(format, log) {
    function afterSubmit(scriptContext) {
        var dateString = '03/17/2025'; // Matches current date in prompt
        var parsedDate = format.parse({
            value: dateString,
            type: format.FormatType.DATE,
            timezone: format.TimeZone.AMERICA_NEW_YORK
        });
        log.debug({
            title: 'Parsed Date',
            details: 'Date Object: ' + parsedDate.toISOString()
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});