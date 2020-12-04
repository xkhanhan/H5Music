(function (root) {
    // 进度条构造器
    function Progress () {
        // 歌曲总时间
        this.durTime = 0;
   
        // 定时器
        this.frameId = null;

        // 开始播放的时间
        this.startTime = 0;

        this.lastPercent = 0;
        this.nextPercent = 0;
        this.init();
    }
    Progress.prototype = {
        init : function () {
            this.getDom();
        },
        getDom : function () {
            this.curTimeDom = document.querySelector('.curTime');
            this.circle = document.querySelector('.circle');
            this.frontBg = document.querySelector('.frontBg');
            this.totalTime = document.querySelector('.totalTime');
        },
        renderTime : function (time) {
            // 渲染总时间
            this.durTime = time;
            this.totalTime.innerText =  this.msToTime(time);
        },
        /**
         * 时间格式转换
         * 秒转换成 00:00
         * @param {*} params  时间 单位：m（秒）
         */
        msToTime :  function (params) {
            params = Math.floor(params);
            var minute =  parseInt(params / 60);
            var second = parseInt(params % 60);

            minute =  minute >= 10 ? minute : '0' + minute;
            second = second >=  10 ? second : '0' + second;

            return minute + ':' + second;
        },
        move : function (pre) {
            // 清除定时器
            var This = this;
  
            // 根据传入的参数设置上一次播放百分比 
            This.lastPercent = pre === undefined ? This.lastPercent : pre;
            cancelAnimationFrame(This.frameId);
         
            // 记录时间
            This.startTime = new Date().getTime();

            function frame () {
                // 记录时间
                var curTime = new Date().getTime();
                // 计算当前时间占比
                // 用上次播放百分比加上这次这次播放占比
                var pre = This.lastPercent +  (curTime - This.startTime) / 1000 / This.durTime;
                // 判断是否播放完成
                if(pre < 1){
                    This.upData(pre);
                }else{
                    // 清除定时器
                    cancelAnimationFrame(This.frameId);
                }

                // 设置定时器
                This.frameId = requestAnimationFrame(frame);
            }

            frame();
        },
        // 修改时间进度
        upData : function(pre) {
            // 把时间转换成 00 ： 00g格式
            var time = this.msToTime( pre * this.durTime );
            // 设置当前时间
            this.curTimeDom .innerText = time;

            // 获取进度条父级的宽度
            var cl = pre * this.circle.parentNode.offsetWidth ;
            this.circle.style.transform = 'translate(' +  cl + 'px)'
            // 设置进度条
            this.frontBg.style.width = pre * 100 + '%';
        },
        // 停止进度
        stop : function (){
           var This = this;
            // 清除定时器
            cancelAnimationFrame(This.frameId);
            // 记录当前时间
            var stopTime = new Date().getTime();
            // 存入上一次的进度
            This.nextPercent = This.lastPercent;
            // 存入当前的进度
            This.lastPercent = This.nextPercent +  ((stopTime - This.startTime) / 1000) / this.durTime ;
        }
    }

    function instancesProgress(time){
        return new Progress(time);
    }

    // 拖住构造器
    function Drag(obj){
        // 要被拖拽的元素
        this.obj = obj;
        // 手指按下时的位置值
        this.starPointX = 0;
        // 进度条已经走过的进度值
        this.startLeft = 0;
        // 手指滑动距离
        this.disPointX = 0;
        // 进度百分比
        this.percent = 0;

        this.parentWidth = 0;
        this.init();
    }
    Drag.prototype = {
        init :function () {
            var This = this;
            // 设置起始的拖拽进度方便以后获取
            This.obj.style.transform = 'translateX(0)';

            // 手指按下事件
            This.obj.addEventListener('touchstart', function (ev) {
                // 设置按下时位置值
                This.starPointX = ev.changedTouches[0].pageX ;

                // 设置按下时进度条已经走过的位置值
                This.startLeft = parseFloat(This.obj.style.transform.split('(')[1]);
                
                // 对外提供的方法
                This.start && This.start(); 
            });
            
            This.obj.addEventListener('touchmove', function(ev){
                // 手指滑动的距离
                This.disPointX = ev.changedTouches[0].pageX - This.starPointX;

                // 当前进度的值 = 手指滑动距离加上次滑动距离
                var l = This.disPointX + This.startLeft;
                This.parentWidth = This.obj.offsetParent.offsetWidth
                // 边界处理
                l = l < 0 ? 0 : l >     This.parentWidth ?  This.parentWidth : l;
          
                // 设置样式
                This.obj.style.transform = 'translate('+ l+'px)';

                // 设置进度百分比
                This.percent =   l  /  This.parentWidth

                This.move && This.move(This.percent);
                ev.preventDefault()
            });

            This.obj.addEventListener('touchend', function() {
                This.end && This.end(This.percent);
            });
        }
    }

    function instancesDarg(obj){
        return new Drag(obj);
    }
    root.progress = {
        prop : instancesProgress,
        drag : instancesDarg
    };
})(window.player || (window.player = {}))