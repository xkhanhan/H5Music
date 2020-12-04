(function(root){
    function Index(len) {
        this.index = 0 ;
        this.len = len;
    }
    Index.prototype = {
        prev : function(){
            this.get(-1)
        },
        next : function () {
            this.get(+1)
        },
        //  获取索引 参数为 +1或-1
        get : function(value){
            this.index = (this.index + value + this.len) % this.len;
            return this.index;
        }
    }
    root.controlIndex = Index;
})(window.player || (window.player = {}))