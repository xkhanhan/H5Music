(function ($, player) {
    function MusicPlayer(dom) {
        //播放器容器
        this.wrap = dom;
        //数据
        this.dataList = [];

        //索引
        this.indexObject = null;
        // 当前歌曲索引
        this.curIndex = 0;
        // 图片旋转定时器
        this.rotateTime = null;
        // 列表切割对象,在 listPlay 赋值
        this.list = null

        // //音乐时间
        // this.musicAllTime
        // 进度条以及 进度时间功能
        this.progress = null;
    }

    MusicPlayer.prototype = {
        // 初始化方法
        init: function () {
            this.getDom();
            this.getData('../data.json')
        },
        //获取dom元素
        getDom: function () {
            this.record = document.querySelector(".songImg img");
            this.controlBtns = document.querySelectorAll(".control li");
        },
        // 获取数据
        getData: function (src) {
            var This = this;
            $.ajax({
                url: src,
                method: 'get',
                success: function (data) {
                    // 挂载数据
                    This.dataList = data;

                    // 挂载音乐列表信息
                    This.listPlay();

                    // 挂载索引信息
                    This.indexObject = new player.controlIndex(data.length);

                    // 加载音乐
                    This.loadMusic(This.indexObject.index);

                    //添加音乐操作方法
                    This.musicControl();
                    // 进度条进度
                    This.progress = player.progress.prop();
                    //进度条拖拽方法
                    This.dargProgress();
                    
                    // 加载时间
                    player.music.audio.addEventListener('loadedmetadata', function () {
                        This.progress.renderTime(player.music.audio.duration);
                    });

                },
                error: function () {
                    console.log("请求失败", src);
                }
            })
        },
        // 加载音乐
        loadMusic: function (index) {
            var This = this;
            // 加载图片 渲染信息
            player.render(This.dataList[index]);
            //加载音乐
            player.music.load(This.dataList[index].audioSrc);
            //播放音乐
            if (player.music.status == 'play') {
                player.music.play();
                This.controlBtns[2].className = 'playing';
                This.rotateImg(0);

                This.progress.move(0);
            }
            // 加载当前歌曲时挂载索引
            This.curIndex = index;

            // 改变列表中选中的歌曲
            This.list.changeSelect(index);
        },
        // 菜单栏
        musicControl: function () {
            var This = this;
            // 不要用 click 事件 ，用手指按下事件



            // 上一首
            this.controlBtns[1].addEventListener('touchend', function () {
                // 改变音乐状态
                player.music.status = 'play';
                This.loadMusic(This.indexObject.get(-1));
            })


            this.pauseMusicFn = function () {
                player.music.pause();
                player.music.status = 'pause';
                This.controlBtns[2].className = '';
                //暂停图片旋转
                This.stopImg();

                This.progress.stop();
            }

            this.playMusicFn = function(){
                player.music.play();
                This.controlBtns[2].className = 'playing';

                // 获取角度
                var deg = This.record.dataset.rotate || 0;
                // 旋转图片
                This.rotateImg(deg);

                // 对加载时间
                This.progress.move();
            }
            // 暂停
            this.controlBtns[2].addEventListener('touchend', function () {

                // 改变音乐状态
                if (player.music.status == 'play') {
                    This.pauseMusicFn();
                } else if (player.music.status == 'pause') {
                    This.playMusicFn()
                }
            })

            // 下一首
            this.controlBtns[3].addEventListener('touchend', function () {
                // 改变音乐状态
                player.music.status = 'play';

                This.loadMusic(This.indexObject.get(+1));

            })

        },
        // 图片旋转
        rotateImg: function (deg) {
            var This = this;
            clearInterval(this.rotateTime);
            this.rotateTime = setInterval(function () {
                deg = +deg + 0.2

                This.record.style.transform = "rotate( " + deg + "deg)";
                // 在图片上设置一个属性方便继续旋转
                This.record.dataset.rotate = deg;
            }, 1000 / 60)
        },
        // 停止图片旋转
        stopImg: function () {
            clearInterval(this.rotateTime); // 清除定时器让片不旋转
        },
        // 列表加载
        listPlay: function () {
            var This = this;
            //挂载 列表的信息
            this.list = player.listControl(this.dataList, this.wrap);
            // 添加列表切出事件
            this.controlBtns[4].addEventListener('touchend', function () {
                This.list.slideUp();
            });

            this.list.musicList.forEach(function (item, index) {
                item.addEventListener('touchend', function () {
                    This.list.changeSelect(index);

                    /**
                     * 1. 如果点解的列表为当前播放的歌曲不做出任何处理
                     * 
                     * 2. 不为当前歌曲时切换歌曲，歌曲状态（“status”）改为 播放状态（“play”），
                     * 并且对索引值（indexObject.index）进行改变，列表进行隐藏
                     */
                    if (This.curIndex == index) { return } else {
                        player.music.status = 'play';

                        This.indexObject.index = index;

                        This.loadMusic(index);
                    }
                    This.list.slideDown();
                })
            })

        },
        // 拖拽进度条
        dargProgress: function () {
            var obj = document.querySelector('.circle');
            var circle = player.progress.drag(obj);
            var This = this;
            circle.start = function () {
                // 停止进度条增加
                This.progress.stop();
            };
            circle.move = function (pre) {
                // 修改歌曲时间
                This.progress.upData(pre);
            };
            circle.end = function (pre) {
                var curTime = pre * player.music.audio.duration;
                player.music.playTo(curTime);
                // player.music.play();
                This.progress.move(pre)
                This.playMusicFn();
            }
        }

    }

    var musicPlayer = new MusicPlayer(document.querySelector('#wrap'))
    musicPlayer.init()
})(window.Zepto, window.player)