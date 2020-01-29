link = {
    init: function () {
        const that = this;
        /*加载 linklist.json 文件路径*/
        $.getJSON("linklist.json",
            function (data) {
                that.render(data);
            });
    },
    render: function (data) {
        let html = "", nickname, avatar, site;
        for (let i = 0; i < data.length; i++) {
            nickname = data[i].nickname;
            avatar = data[i].avatar;
            site = data[i].site;
            /*将数据拼接成html*/
            html += '<div class="card">' + '<a href="' + site + '" target="_blank">' + '<div class="thumb" style="background: url( ' + avatar + ');">' + '</div>' + '</a>' + '<div class="card-header">' + '<div><a href="' + site + '" target="_blank">' + nickname + '</a></div>' + '</div>' + '</div>';

        }
        /*将拼接好的html添加进友链页面*/
        $(".link-navigation").append(html);
    }
};
link.init();