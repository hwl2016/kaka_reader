//字体自适应
(function(window, document) {
    var fontSize = 100;	//根字体的大小
    var diviceWidth = 375;
    var page = document.getElementsByTagName('body')[0];
    var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            if(fontSize * (docEl.clientWidth / diviceWidth) <= 85.333) {
                docEl.style.fontSize = '85.333px';
            }else if(fontSize * (docEl.clientWidth / diviceWidth) > 140) {
                docEl.style.fontSize = '140px';
            }else {
                docEl.style.fontSize = fontSize * (docEl.clientWidth / diviceWidth) + 'px';
            }
        };
    if(window.addEventListener) {
        window.addEventListener(resizeEvt, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);
    }
    //document.body.style.display = 'block';
})(window, document);