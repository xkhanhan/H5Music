# 运行该项目
1. 先下载 gulp ， 再 npm install 下载相关插件。
2. 在 src 目录下创建一个 data.json 文件。格式如下
```json
    [{
    // 图片路径
    "image" : "../images/Yoni Tokayer and Nina Medved_Unknown_4.jpg",

    // 是否为喜欢
    "like" : true,

    // 音乐路径
    "audioSrc" : "../music/司南 - 冬眠.flac",

    // 作者
    "name" : "司南 ",

    // 音乐名
    "singer" : "冬眠",

    // 专辑
    "album" : "冬眠"
},{
    ...
}]
```
3. 创建 images 文件夹存放图片
4. 创建 music 文件夹存放音乐
5. 输入 gulp 压缩项目
6. 使用vscode live serve 启动 dist文件夹下的 html.
7. 在浏览器切换至移动端 