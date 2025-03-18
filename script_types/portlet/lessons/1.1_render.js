/**
 * Lesson 1.1: Displaying a List with render
Objective: Use render to create a list portlet showing recent Sales Orders.

Explanation: The render entry point is the sole handler for Portlet Scripts, receiving a scriptContext object with a portlet parameter (an N/ui/serverWidget Portlet object). It’s used to define the portlet’s content, such as a list, form, or HTML. This lesson focuses on rendering a simple list portlet using scriptContext.portlet properties like addColumn and addRow.

Deployment/Viewing Instructions:

Save as port_list.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a Portlet Script (Customization > Scripting > Scripts > New), set Script Type to Portlet, link the file, and deploy (Status: Released).
In the deployment (Customization > Scripting > Script Deployments), set Portlet Type to LIST.
Add the portlet to your dashboard (Personalize Dashboard > Custom Portlet), select this script, refresh the page, and verify the list displays.
Hands-On Coding Challenge:
Display a list of the 5 most recent Sales Orders with IDs and totals.
 */

define(['N/search'], function(search) {
    function render(scriptContext) {
        var portlet = scriptContext.portlet;
        portlet.title = 'Recent Sales Orders';
        
        // Define columns
        portlet.addColumn({
            id: 'id',
            type: 'text',
            label: 'Sales Order ID',
            align: 'LEFT'
        });
        portlet.addColumn({
            id: 'total',
            type: 'currency',
            label: 'Total',
            align: 'RIGHT'
        });

        // Fetch recent Sales Orders
        var soSearch = search.create({
            type: 'salesorder',
            filters: [['mainline', 'is', 'T']],
            columns: [
                search.createColumn({ name: 'internalid', sort: search.Sort.DESC }),
                'total'
            ]
        });
        var count = 0;
        soSearch.run().each(function(result) {
            portlet.addRow({
                id: result.getValue('internalid'),
                total: result.getValue('total')
            });
            count++;
            return count < 5; // Limit to 5 rows
        });
    }
    return { render: render };
});