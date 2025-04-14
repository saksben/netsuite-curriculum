SuiteScript is just an API accessed by JavaScript. Meaning that it is just a bunch of objects, properties, methods, and enums.

The basic rundown of every SuiteScript is:
1. Know the classification of what you want to do and where you want it to run (script type, and its appropriate entry point)
2. Know how to grab the record or UI you want to grab (record type, by its id or internal id)
3. Know how you specifically want to manipulate it (modules and their objects[let you grab parts of something]/properties[grab specific parts of it]/enums[specify aspects]/methods[let you do something with it])
4. Use JavaScript on these modules to do what you want to do

Each record can be viewed this way:
1. Record object. Use Record module - interact with the entire record object
2. Body fields. Use currentRecord module - interact with the body fields on the main area of the record or on a subtab
3. Buttons/actions. Use ui/serverWidget module to add a new button object, and use Action module to perform business logic to update the state of records in view mode
4. Subtabs. Use ui/serverWidget module - programmatically add fields to a NetSuite tab or add custom subtabs
5. Sublists. Use ui/serverWidget module - interact with "line item" sublist fields

Governance
There is an amount of governance units that limit some scripts.
Module/Api | Governance usage units used
Action.executeBulk() | 50
action.executeBulk() | 50
-
auth.changeEmail() | 10
auth.changePassword() | 10
-
Cache.get() | 1 if value is present in cache, 2 if loader function is used
Cache.put() | 1
Cache.remove() | 1
-
Certificate.save() | 10
certificateControl.createCertificate() | 10
certificateControl.deleteCertificate() | 10
certificateControl.findCertificates() | 10
certificateControl.findUsages() | 10
certificateControl.loadCertificate() | 10
-
config.load() | 10
-
certificate.createSigner() | 10
certificate.createVerifier() | 10
certificate.verifyXmlSignature() | 10
certificate.signXml() | 10
-
currency.exchangeRate() | 10
-
Dataset.run() | 10
Dataset.runPaged() | 10
Dataset.save() | 10
dataset.describe() | 10
dataset.list() | 10
dataset.listPaged() | 10
dataset.load() | 10
-
email.send() | 20
email.sendBulk() | 10
email.sendCampaignEvent() | 10
-
File.save() | 20
file.delete() | 20
file.load() | 10
-
format/i18n: CurrencyFormatter.format() | 10
NumberFormatter.format() | 10
format.getCurrencyFormatter() | 10
format.getNumberFormatter() | 10
-
http: ServerResponse.renderPdf() | 10
http.get() | 10
http.delete() | 10
http.post() | 10
http.put() | 10
http.request() | 10
-
https: ServerResponse.renderPdf() | 10
ServerResponse.writePage() | 10
https.get() | 10
https.delete() | 10
https.post() | 10
https.put() | 10
https.request() | 10
https.requestRestlet() | 10
https.requestSuiteTalkRest() | 10
-
https/clientCertificate: clientCertificate.delete(options) | 10
clientCertificate.get(options) | 10
clientCertificate.post(options) | 10
clientCertificate.put(options) | 10
clientCertificate.request(options) | 10
-
keyControl: Key.save() | 10
keyControl.createKey(options) | 10
keyControl.deleteKey(options) | 10
keyControl.findKeys(options) | 10
keyControl.loadKey(options) | 10
-
llm.evaluatePrompt(options) | 100
llm.evaluatePrompt.promise(options) | 100
llm.generateText(options) | 100
llm.generateText.promise(options) | 100
-
A company is allowed to make up to 100,000 log method calls within 60 minutes across all scripts
-
PiRemovalTask.deleteTask() | 20
PiRemovalTask.run() | 20
PiRemovalTask.save() | 20
piremoval.deleteTask(options) | 20
-
Query.run() | 20
Query.runPaged() | 20
SuiteQL.run() | 10
SuiteQL.runPaged() | 10
query.delete() | 5
query.load() | 5
query.runSuiteQL() | 10
query.runSuiteQLPaged() | 10
-
Record.save() | 20 for transaction records; 4 for custom records; 10 for all other records
record.attach() | 10
record.copy() | 10 for transaction records; 2 for custom records; 5 for all other records
record.create() | 10 for transaction records; 2 for custom records; 5 for all other records
record.delete() | 20 for transaction records; 4 for custom records; 10 for all other records
record.detach() | 10
record.load() | 10 for transaction records; 2 for custom records; 5 for all other records
record.submitFields() | 10 for transaction records; 2 for custom records; 5 for all other records
record.transform() | 10 for transaction records; 2 for custom records; 5 for all other records
-
recordContext.getContext() | 10
-
redirect.toSavedSearch() | 5
redirect.toSavedSearchResult() | 5
-
render.bom() | 10
render.packingSlip() | 10
render.pickingTicket() | 10
render.statement() | 10
render.transaction() | 10
render.xmlToPdf() | 10
-
search: (search results are limited to 1000 records)
Page.next() | 5
Page.prev() | 5
PagedData.fetch(options) | 5
ResultSet.each(callback) | 10
ResultSet.getRange(options) | 10
Search.runPaged(options) | 5
Search.save() | 5
search.delete(options) | 5
search.duplicates(options) | 10
search.global(options) | 10
search.load(options) | 5
search.lookupFields(options) | 1
-
sftp: Connection.download(options) | 100
Connection.list(options) | 10
Connection.makeDirectory(options) | 10
Connection.move(options) | 10
Connection.removeDirectory(options) | 10
Connection.removeFile(options) | 10
Connection.upload(options) | 100
-
sso.generateSuiteSignOnToken(options) | 20
suiteAppInfo.isBundleInstalled(options) | 5
suiteAppInfo.isSuiteAppInstalled(options) | 5
suiteAppInfo.listBundlesContainingScripts(options) | 10
suiteAppInfo.listInstalledBundles() | 10
suiteAppInfo.listInstalledSuiteApps() | 10
suiteAppInfo.listSuiteAppsContainingScripts(options) | 10
-
task: CsvImportTask.submit() | 100
EntityDeduplicationTask.submit() | 100
MapReduceScriptTask.submit() | 20
MapReduceScriptTaskStatus.getCurrentTotalSize() | 25
MapReduceScriptTaskStatus.getPendingMapCount() | 10
MapReduceScriptTaskStatus.getPendingMapSize() | 25
MapReduceScriptTaskStatus.getPendingOutputCount() | 10
MapReduceScriptTaskStatus.getPendingOutputSize() | 25
MapReduceScriptTaskStatus.getPendingReduceCount() | 10
MapReduceScriptTaskStatus.getPendingReduceSize() | 25
MapReduceScriptTaskStatus.getPercentageCompleted() | 10
MapReduceScriptTaskStatus.getTotalMapCount() | 10
MapReduceScriptTaskStatus.getTotalOutputCount() | 10
MapReduceScriptTaskStatus.getTotalReduceCount() | 10
QueryTask.submit() | 100
RecordActionTask.submit() | 50
ScheduledScriptTask.submit() | 20
SearchTask.submit() | 100
SuiteQLTask.submit() | 100
WorkflowTriggerTask.submit() | 20
-
task/accounting/recognition: MergeArrangementsTask.submit() | 20
MergeElementsTask.submit() | 20
recognition.checkStatus(options) | 50
-
transaction.void() | 10
-
translation.get() | 1
translation.load() | 1
-
Workbook.runPivot() | 10 per intersection returned
-
workflow.initiate() | 20
workflow.trigger() | 20


Module counts: