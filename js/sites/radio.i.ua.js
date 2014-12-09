var len = $('span[onclick^="radioy.playIt"]').length;
$('span[onclick^="radioy.playIt"]', document).each(function(index, element) {
	
	var href = $(this).attr('onclick');
	href = href.substring(href.indexOf("'")+1,href.lastIndexOf("'"));
	
	// add play button
	$holder = $(this).parent().parent().parent().parent();
	$holder.prepend('<div class="block_important"><div class="tl"></div><div class="tr"></div><div class="br"></div><div class="bl"></div><div class="content clear"><p><a class="play_button playoninext" href="'+href+'" title="слушать онлайн"></a></p><span class="" title="Слушают сейчас">на iNeXT</span></div></div>');
	
	if (index == len - 1) {
    	console.log('Last field, submit form here');
    	plugin.readyToServe();
    }

});

