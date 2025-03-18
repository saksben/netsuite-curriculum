/**
 * Lesson 4: Using TimeZone for Date-Time Adjustments
Objective: Apply format.TimeZone to adjust date-time formatting across regions.

Explanation: The timezone option in format.format and format.parse uses format.TimeZone values (e.g., GMT, ASIA_TOKYO) to adjust date-time output or parsing. This is critical for global applications where users operate in different time zones.

Deployment/Viewing Instructions:

Save as fmt4_timezone.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order, then check the Execution Log for the time zone-adjusted output.
Hands-On Coding Challenge:
Format the current date-time in Tokyo time and log it.
 */

define(['N/format', 'N/log'], function(format, log) {
    function afterSubmit(scriptContext) {
        var currentDate = new Date();
        var tokyoTime = format.format({
            value: currentDate,
            type: format.FormatType.DATETIME,
            timezone: format.TimeZone.ASIA_TOKYO
        });
        log.debug({
            title: 'Tokyo Time',
            details: 'Current Date-Time in Tokyo: ' + tokyoTime
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});