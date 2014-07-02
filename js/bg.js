var VERSION = "1.1.36";

function log(msg) {
    console.log(msg);
}

function insertScript(url, preload, sourceTabId) {
    var i, item, scripts = [];
    
	url = url.replace("www.", "") + '.js';
    if (!preload) {
	    scripts.push({
	        filename: url,
	        sandbox: true
	    });
    }
    
    // process scripts immediatelly
    processScripts(sourceTabId, scripts);
}

function processScripts(sourceTabId, scripts)
{
    if(scripts.length) {
        for(i = 0; i < scripts.length; i++) {
            try {
                var filename = scripts[i].filename;
                log("insertScript: inject script: filename=" + filename + " sandbox=" + scripts[i].sandbox);
                
                if(scripts[i].sandbox) {
                    chrome.tabs.executeScript(sourceTabId, {file: "js/sites/"+filename}, function() {
                            log("script loaded: filename=" + filename);
                            
                    });
                }
                else {
                    chrome.tabs.sendMessage(sourceTabId, {
                            method: "injectScript",
                            file: "js/sites/"+filename
                    });
                }
            }
            catch(e) {
                log("processScripts: failed to load script: filename=" + filename + " error=" + e);
            }
        }
    }
}

function onMessage(request, sender, sendResponse) {
	var sourceTabId,
	    method = request.method;
	    
    if(sender.tab) {
        sourceTabId = sender.tab.id;
    }
	    
	log("onMessage: tabID=" + sourceTabId + " method=" + method);
	
	if(method == "onDOMStart") {
	    if(!sourceTabId) {
	        log("onMessage: missing source tab id");
	        return;
	    }
	    
	    if(typeof request.url !== 'string') {
	        log("bad url");
	        return;
	    }
	    
	    insertScript(request.url, true, sourceTabId);
	}
	else if(method == "onDOMReady") {
	    if(!sourceTabId) {
	        log("onMessage: missing source tab id");
	        return;
	    }
	    
	    if(typeof request.url !== 'string') {
	        log("bad url");
	        return;
	    }
	    setTimeout(function() {
	            insertScript(request.url, false, sourceTabId);
	    }, 500);
	}
	else if(method == "injectScript") {
	    if(!sourceTabId) {
	        log("onMessage: missing source tab id");
	        return;
	    }
	    
	    if(typeof request.scripts === 'object' && request.scripts.length) {
	        var i, scriptUrl, callback;
	        for(i = 0; i < request.scripts.length; i++) {
	            scriptUrl = request.scripts[i];
	            log("onMessage: url=" + scriptUrl);
	            
	            if(i == request.scripts.length-1) {
	                // notify content script that last script is loaded
	                callback = function() {
	                    sendResponse();
	                };
	            }
	            else {
	                callback = null;
	            }
	            
	            chrome.tabs.executeScript(sourceTabId, {file: scriptUrl}, callback);
	        }
	    }
	}
	else if(method == "injectStyle") {
	    if(!sourceTabId) {
	        log("onMessage: missing source tab id");
	        return;
	    }
	    
	    if(typeof request.styles === 'object' && request.styles.length) {
	        var i, styleUrl, callback;
	        for(i = 0; i < request.styles.length; i++) {
	            styleUrl = request.styles[i];
	            log("injectStyle: url=" + styleUrl);
	            
	            if(i == request.styles.length-1) {
	                // notify content script that last script is loaded
	                callback = function() {
	                    sendResponse();
	                };
	            }
	            else {
	                callback = null;
	            }
	            
	            chrome.tabs.insertCSS(sourceTabId, {file: styleUrl}, callback);
	        }
	    }
	}
	else {
	    log("onRequest: unknown method: " + method);
	    return false;
	}
	
	return true;
}


chrome.runtime.onMessage.addListener(onMessage);

