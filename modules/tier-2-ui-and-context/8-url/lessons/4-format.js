/**
 * Lesson 4.1: Formatting URLs with format
Objective: Use format to construct a parameterized URL from components.

Explanation: format constructs a URL from a domain, path, and query parameters, returning a fully formatted string. This lesson builds a custom URL with parameters, useful for dynamic links.

Deployment/Viewing Instructions: Same as Lesson 1.1; open the Suitelet URL, check the formatted URL, and verify the Execution Log.

Hands-On Coding Challenge:

Format a URL with a domain and a Sales Order ID parameter.
 */

define(['N/url', 'N/log'], function(url, log) {
    function onRequest(scriptContext) {
        var domain = url.resolveDomain({
            hostType: url.HostType.APPLICATION
        });
        var formattedUrl = url.format({
            domain: domain,
            path: '/app/accounting/transactions/salesord.nl',
            params: {
                id: '1001', // Replace with a valid ID
                e: 'T' // Edit mode
            }
        });
        log.debug({
            title: 'Formatted URL',
            details: 'Custom URL: ' + formattedUrl
        });
        scriptContext.response.write('Formatted Sales Order URL: <a href="' + formattedUrl + '">SO 1001 Edit</a>');
    }
    return { onRequest: onRequest };
});