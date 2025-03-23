/**
 * Lesson 3: Initiating a Login Flow with initiateLogin
Objective: Use auth.initiateLogin to start an authentication redirect (SSO context).

Explanation: auth.initiateLogin generates a URL to redirect users to a NetSuite login page (e.g., for Single Sign-On or re-authentication), taking an optional redirectUri parameter for post-login redirection. It returns an object with a url property. This is niche, typically used in Suitelets for custom login workflows, and requires specific setup (e.g., SSO configuration). For sandbox testing, it’s more illustrative than fully functional unless SSO is enabled.

Deployment/Viewing Instructions:

Save as auth3_login.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the browser (or Execution Log) for the login URL; clicking it may redirect to a login page if SSO is configured.
Hands-On Coding Challenge:
Generate a login URL and log it.
 */

define(['N/auth', 'N/log'], function(auth, log) {
    function onRequest(scriptContext) {
        var loginInfo = auth.initiateLogin({
            redirectUri: 'https://your-sandbox.netsuite.com' // Replace with a valid redirect URI
        });
        log.debug({
            title: 'Login URL Generated',
            details: 'Login URL: ' + loginInfo.url
        });
        scriptContext.response.write('Login URL generated: ' + loginInfo.url + '. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});