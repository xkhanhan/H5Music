/**
 * 渲染功能
 * 渲染图片，音乐，歌曲，信息，是否喜欢
 */ 
(function (root) {
    function renderImage(src){
        var img = document.querySelector(".songImg img");
        img.src = src;
    };
    function renderInfo(data){
   var songInfo = document.querySelectorAll(".songInfo *");
        songInfo[0].innerText = data.name;
        songInfo[1].innerText = data.singer
        songInfo[2].innerText = data.album

    };
    function renderLike (isLike){
        var control = document.querySelector('.control li:nth-child(1)');
        control.className = isLike ? "liking" :""
    } ;
    root.render = function(data){
        renderImage(data.image);
        renderInfo(data);
        renderLike(data.like)
    }
})(window.player ||  (window.player = {}))