var pattern = /(https?:)?\/\/img\.youtube\.com\/vi\/([^\/]+)/;
var elements2Youtube = [];
var n = 0;

var imgs = document.querySelectorAll('img');
var elements = document.querySelectorAll('[style]');

chrome.runtime.sendMessage('...');

Array.prototype.forEach.call(imgs, function( img, i) {
    var matches = img.src.match(pattern);
    if(matches) {
        elements2Youtube.push([img, matches[2]]);
    }
});
Array.prototype.forEach.call(elements, function(element, i) {
    if(!element.style.background) return;
    var matches = element.style.background.match(pattern);
    if(matches) {
        elements2Youtube.push([element, matches[2]]);
    }
});

var total = elements2Youtube.length;
chrome.runtime.sendMessage(total ? ('0/' + total) : 'ok');

elements2Youtube.forEach(function(item) {
    var element = item[0];
    var video = item[1];
    var parent = element.parentElement;
    var iframe = document.createElement('iframe');

    iframe.onload = function() {
        n++;
        chrome.runtime.sendMessage(n + '/' + total);
        if(n === total) {
            chrome.runtime.sendMessage('ok');
        }
    }

    iframe.width = element.width || element.offsetWidth;
    iframe.height = element.height || element.offsetHeight;
    iframe.frameborder = 0;
    iframe.allowfullscreen = true;
    iframe.src = '//www.youtube.com/embed/' + video;
    iframe.style.zIndex = 99999999999;
    iframe.style.position = 'absolute';
    parent.removeChild(element);
    parent.appendChild(iframe);
});

console.log(n + ' videos converted');