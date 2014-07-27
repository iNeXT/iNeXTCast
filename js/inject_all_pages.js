
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

// Direck br command href
$('a[href^="playoninext://"]').unbind('click');
$('a[href^="playoninext://"]').click(function(event){
	console.log("BishopRock");
	event.preventDefault();
	sendBishoprockComandToPlayer($(this).attr('href').substring(14));
});