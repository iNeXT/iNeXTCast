$(function () {
	// Saves options to chrome.storage
	function save_options() {
	  var ip = $('#ipaddress').val();
	  chrome.storage.local.set({
	    ipaddress: ip,
	  }, function() {
	    // Update status to let user know options were saved.
	    $("#save span").html('Done');
	    setTimeout(function() {
	      window.close();
	    }, 550);
	  });
	}
	
	// Restores select box and checkbox state using the preferences
	// stored in chrome.storage.
	function restore_options() {
		// Use default value color = 'red' and likesColor = true.
		chrome.storage.local.get({
			ipaddress: '192.168.1.100'
		}, function(items) {
			$('#ipaddress').val(items.ipaddress);
		});
	}
	
	restore_options();
	
	$("#save").click(function(){save_options()});
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	       save_options();
	    }
	});
});