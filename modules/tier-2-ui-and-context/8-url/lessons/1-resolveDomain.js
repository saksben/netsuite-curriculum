/**
 * Lesson 1.1: Generating Domain URLs with resolveDomain
Objective: Use resolveDomain to create a URL for the NetSuite domain.

Explanation: resolveDomain generates a base URL for a NetSuite domain (e.g., production, sandbox), accepting options like hostType (e.g., APPLICATION, RESTLET). This lesson creates a domain URL for RESTlet access, useful for API calls.

Deployment/Viewing Instructions:

Save as url_resolvedomain.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script (Customization > Scripting > Scripts > New), set Script Type to Suitelet, link the file, and deploy (Status: Released).
Open the External URL from the deployment in a browser, check the displayed URL, and verify the Execution Log.
Hands-On Coding Challenge:
Generate a RESTlet domain URL and display it.
 */

define(['N/url', 'N/log'], function(url, log) {
    function onRequest(scriptContext) {
        var domainUrl = url.resolveDomain({
            hostType: url.HostType.RESTLET
        });
        log.debug({
            title: 'Domain URL',
            details: 'RESTlet Domain: ' + domainUrl
        });
        scriptContext.response.write('RESTlet Domain URL: ' + domainUrl);
    }
    return { onRequest: onRequest };
});