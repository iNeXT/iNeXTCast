$('a[href^="/get/"]', document).each(function(e) {
	var title = $(this).attr('title');
	var href = $(this).attr('href');
	if(!title) {
		return true;
	}
	
	var ext;
	
	// get extension from title
	var matches = (new RegExp('\\.([^\\.]+)$')).exec(title);
	if(matches) {
		ext = matches[1];
		if (plugin.canPlay(ext)) {
			// add play button
			$holder = $(this).parent().siblings('td[width="110"]');
			$holder.css({"width":300});
			$holder.append('<span class="r_button_small"><a href="'+href+'" rel="nofollow" class="playoninext">играть на iNeXT</a></span>');
		}
		//console.log(">>> title=" + title + " ext=" + ext + " | canPlay=" + plugin.canPlay(ext));
	}
	
	plugin.readyToServe();
});

