
var plugin = (function () {
	
	// private
	var bishoprockAPIEndpoint = "http://inextapi.com/stb/1/bishoprock/save/";
	var clientID = 2;
	var playableFiles = ['avi', 'mkv', 'm2ts', 'ts', 'mpg', 'mp4', 'mp3','ogg', 'flac'];
	
	
	function sendToBishoprockAPI(location, url, data, callback) {
		$.ajax({
		  type: "POST",
		  url: bishoprockAPIEndpoint,
		  data: { client: clientID, location_url: location, file_url: url, additional_data: data},
		}).done(function( data ) {
			if ( console && console.log ) {
				console.log( "Bishoprock response: " + data );
			}
			callback(data);
		});
	}
	
	function sendBishoprockComandToPlayer(requestid) {
		chrome.storage.local.get({
			ipaddress: '192.168.1.100'
		}, function(items) {
			url = "http://" + items.ipaddress + "/rc/rc.php?do=br&cmd=" + requestid;
			$.ajax({
			  type: "GET",
			  url: url
			}).done(function( data ) {
				
			});
		});
	}
	
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
			$protocol = document.location.protocol;
			$('a.playoninext').unbind('click');
			$('a.playoninext').click(function(event){
				event.preventDefault();
				var link = $(this).attr('href');
				sendToBishoprockAPI(document.URL, link, '', function(data){sendBishoprockComandToPlayer(data)});
				
			});
			
			$('a.redirecttoinext').unbind('click');
			$('a.redirecttoinext').click(function(event){
				event.preventDefault();
				var link = $(this).attr('href');
				
				chrome.storage.local.get({
					ipaddress: '192.168.1.100'
				}, function(items) {
					url = "http://" + items.ipaddress + "/rc/rc.php?do=play&file=" + link + "&closeonload=true";
					window.open(url);
				});
				
			});
			
			$('a.youtuberedirect').unbind('click');
			$('a.youtuberedirect').click(function(event){
				event.preventDefault();
				var link = document.URL;
				
				chrome.storage.local.get({
					ipaddress: '192.168.1.100'
				}, function(items) {
					url = "http://" + items.ipaddress + "/rc/rc.php?do=play&file=" + link + "&closeonload=true";
					window.open(url);
				});
				
			});
			
		}
		
	}
	
})();

chrome.runtime.onMessage.addListener(plugin.onMessageFromBackground);

plugin.onDOMStart();
document.addEventListener("DOMContentLoaded", plugin.onDOMReady, false);