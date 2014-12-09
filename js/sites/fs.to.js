if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};
if (!Array.prototype.first){
    Array.prototype.first = function(){
        return this[0];
    };
};

function scan(obj) {
	//$( ".playoninext" ).remove();
	$('a[href^="/get/dl"]', obj).each(function(e) {
		var title = $(this).attr('href').split("/").last();
		var href = $(this).attr('href');
		if(!title) {
			return true;
		}
		$holder = $(this).parent();
		if ( $holder .find('.playoninext').length )
			return true;
		
		var ext;
		//console.log(">>> title=" + title + " href=" + href);
		//return;
		// get extension from title
		var matches = (new RegExp('\\.([^\\.]+)$')).exec(title);
		if(matches) {
			ext = matches[1];
			if (plugin.canPlay(ext)) {
				// add play button
				$holder = $(this).parent();
				$(".b-file-new__link-material-filename", $holder).css({'width':'300'});
				
				$holder.prepend('<a href="'+href.split("&").first()+'" class="b-file-new__link-material playoninext" rel="nofollow"><span class="b-file-new__link-material-filename" style="width:63px;"><span class="b-file-new__link-material-filename-text">на iNeXT</span></a>');
			}
		}
	});
	
	plugin.readyToServe();
	
}
$(".b-files-folders").bind("DOMSubtreeModified", function() {
   //console.log("###################################");
   scan($(this));
});
//setInterval(scan, 10000);