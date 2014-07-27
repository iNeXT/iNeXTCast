/*


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return false;
}

if (getQueryVariable('v') != false && getQueryVariable('v') != "") {
*/
	$href = document.URL;
	$("#yt-masthead-user").prepend('<span id="appbar-onebar-upload-group"><a href="'+$href+'" class="yt-uix-button   yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default playoninext" data-sessionlink="ei=H3rPU-qhA8X8igaQxYDADw&amp;feature=mhsb" id="upload-btn" data-upsell="upload"><span class="yt-uix-button-content">Play on iNeXT </span></a></span>');
	plugin.readyToServe();

//}