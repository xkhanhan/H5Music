(function (root) {
    function AudioManage(){
        this.audio = new Audio();
        // 默认暂停
        this.status = 'pause';
    }
    AudioManage.prototype = {
        load : function(src){
            // 设置音乐路径
            this.audio.src = src
            //加载音乐
            this.audio.load();
          
         
        },
        // 播放音乐
        play : function(){
            this.audio.play();
            this.status = 'play';
        },
        //暂停
        pause : function(){
            this.audio.pause();
            this.status = 'pause';
        },
        // 播放完成
        onended : function(fn){
            this.audio.onended = fn;
        },
        // 拖拽
        playTo : function (time) {
            this.audio.currentTime = time;
        },
        // 监听歌曲进度
        // listenMusic : function (fn){
        //     this.audio.addEventListener('timeupdate', function (){
        //         fn(this.duration);
        //     })
        // }
    }
    root.music = new AudioManage;
})(window.player || (window.player = {}))