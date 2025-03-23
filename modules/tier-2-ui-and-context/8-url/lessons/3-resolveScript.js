/**
 * Lesson 3.1: Linking to Scripts with resolveScript
Objective: Use resolveScript to create a URL for a deployed script (e.g., RESTlet).

Explanation: resolveScript generates a URL to a deployed script (Suitelet, RESTlet, etc.), accepting options like scriptId, deploymentId, and params. This lesson creates a link to a RESTlet, useful for external integrations.

Deployment/Viewing Instructions: Same as Lesson 1.1; deploy a dummy RESTlet first (e.g., from the RESTlet lesson), then use its IDs here. Open the Suitelet URL, check the RESTlet link, and verify the Execution Log.

Hands-On Coding Challenge:

Generate a URL for a RESTlet with script ID “customscript_rest_sample” and deployment ID “customdeploy_rest_sample”.
 */

define(['N/url', 'N/log'], function(url, log) {
    function onRequest(scriptContext) {
        var scriptUrl = url.resolveScript({
            scriptId: 'customscript_rest_sample', // Replace with your RESTlet script ID
            deploymentId: 'customdeploy_rest_sample', // Replace with your deployment ID
            returnExternalUrl: true
        });
        log.debug({
            title: 'Script URL',
            details: 'RESTlet URL: ' + scriptUrl
        });
        scriptContext.response.write('RESTlet URL: <a href="' + scriptUrl + '">RESTlet Link</a>');
    }
    return { onRequest: onRequest };
});