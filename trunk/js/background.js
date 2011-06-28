chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method.indexOf("get_") == 0)
      sendResponse({status: localStorage[request.method.replace("get_", "")]});
    else
      sendResponse({}); // snub them.
});
