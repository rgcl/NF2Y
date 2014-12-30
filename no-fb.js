var pattern = /^(https?:)?\/\/img\.youtube\.com\/vi\/([^\/]+)/;

var imgs = document.querySelectorAll('img');
var n = 0;
Array.prototype.forEach.call(imgs, function(img, i) {
    var matches = img.src.match(pattern);
    if(matches) {
        var video = matches[2];
        var parent = img.parentElement;
        var iframe = document.createElement('iframe');
        iframe.width = img.width;
        iframe.height = img.height;
        iframe.frameborder = 0;
        iframe.allowfullscreen = true;
        iframe.src = '//www.youtube.com/embed/' + video;
        iframe.style.zIndex = 999999;
        parent.removeChild(img);
        parent.appendChild(iframe);
        n++;
    }
    console.log(n + ' videos converted');
});