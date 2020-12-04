(function (root) {
    function listControl(data, wrap) {
        // <div class="list">
        //     <dl>
        //         <dt>播放列表</dt>
        //         <dd class="active">听妈妈的话</dd>
        //         <dd>听妈妈的话</dd>
        //         <dd>听妈妈的话</dd>
        //     </dl>
        //     <div class="close">关闭</div>
        // </div>
        var list = document.createElement('div');
        var dl = document.createElement('dl');
        var dt = document.createElement('dt');
        var close = document.createElement('div');
        // 存入歌曲列表dome信息
        var musicList = [];

        dt.innerText = '播放列表';
        dl.appendChild(dt);
        data.forEach(function(item, index){
            var dd = document.createElement('dd');
            dd.innerText = item.name;
            dd.addEventListener('touchend', function() {
                changeSelect(index);
            })

            dl.appendChild(dd);
            musicList.push(dd);
        });

        list.className = 'list';
        list.appendChild(dl);

        close.className = 'close';
        close.innerText = '关闭'
        close.addEventListener('touchend', function(){
            slideDown();
        })

        list.appendChild(close);
        changeSelect(0);
        wrap.appendChild(list);

        // 设置起始时不可见
        var disY = list.offsetHeight;
        list.style.bottom = -disY +'px';

        // 展开list
        function slideUp(){
            list.style.bottom = 0 +'px';
        }

        //收缩
        function slideDown(){
            list.style.bottom = -disY +'px';
        }

        // 改变选中的歌曲
        function changeSelect (index) {
            var length = musicList.length;
            for(var i = 0; i < length; i++){
                musicList[i].className = '';
            }
            musicList[index].className = 'active';
        }

        return {
            dome : list,
            musicList : musicList,
            slideUp : slideUp,
            slideDown :slideDown,
            changeSelect :changeSelect
        }
    }


    root.listControl=listControl;

})(window.player || (window.player = {}))