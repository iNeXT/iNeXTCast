
var plugin = (function () {
			
	// private
	var playableFiles = ['avi', 'mkv', 'm2ts', 'ts', 'mpg'];
	
	// public
	return {
        
        onMessageFromBackground: function(request, sender, sendResponse) {
            _log("onMessageFromBackground: method=" + request.method);
            
        },
        
        onDOMStart: function() {
            chrome.runtime.sendMessage({
                    method: "onDOMStart",
                    url: document.location.hostname
            });
            
        },
        
        onDOMReady: function() {
            chrome.runtime.sendMessage({
                    method: "onDOMReady",
                    url: document.location.hostname
            });
        },
		
		canPlay: function (ext) {
			if (playableFiles.indexOf(ext) > -1)
				return true;
			return false;
		},
		
		readyToServe: function() {
			$('a.playoninext').unbind('click');
			$('a.playoninext').click(function(event){
				event.preventDefault();
				var link = $(this).attr('href');
				
				chrome.storage.local.get({
					ipaddress: '192.168.1.100'
				}, function(items) {
					$.ajax({
					  type: "GET",
					  url: "http://" + items.ipaddress + "/rc/rc.php",
					  data: { do: "play", file: window.location.protocol + "//" + window.location.hostname + link },
					  dataType: "jsonp",
					});
				});
				
			});
			
		}
		
	}
	
})();

chrome.runtime.onMessage.addListener(plugin.onMessageFromBackground);

plugin.onDOMStart();
document.addEventListener("DOMContentLoaded", plugin.onDOMReady, false);