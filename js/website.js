// 一言请求错误次数
let errorCount = 0;

window.onload = function () {
    // 页面初始化完毕执行js
    const code = $('#website-js').attr('code');
    switch (code) {
        case '404':
            requestHitokoto();
            ghostAnimation();
            break;
        case 'all':
            siteTime();
            fix404Bug();
            break;
        default:
            console.log("This is a world of nothingness, please contact me");
    }
};

/**
 * 加载一言
 */
function requestHitokoto() {
    fetch('https://v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
            $('#hitokoto_content').text(data.hitokoto);
            var author = !!data.from ? data.from : "无名氏";
            $('#hitokoto_author').text("—— " + (data.from_who || '') + "「" + author + "」");
            window.setTimeout(requestHitokoto, 10000);
            reloadAnimation();
        })
        .catch(function (err) {
            console.error(`在更新一言时捕获错误， 错误信息: ${err.message}. 当前时间: ${new Date().toISOString()}`);
            if (errorCount < 10) {
                errorCount++;
                requestHitokoto();
            }
        });
}

/**
 * 幽灵动画
 */
function ghostAnimation() {
    const pageX = $(document).width();
    const pageY = $(document).height();
    let mouseY = 0;
    let mouseX = 0;
    $(document).mousemove(function (event) {
        mouseX = event.pageX / -pageX;
        xAxis = -mouseX * 100 - 100;
        mouseY = event.pageY;
        yAxis = (pageY / 2 - mouseY) / pageY * 300;
        $('.box-ghost-eyes').css({'transform': 'translate(' + xAxis + '%,-' + yAxis + '%)'});
    });
}

/**
 * 重载动画
 * Reference link: https://css-tricks.com/restart-css-animation/
 */
function reloadAnimation() {
    let element = document.getElementById("hitokoto");
    // 移除动画
    element.classList.remove('fadeIn');
    void element.offsetWidth;
    // 重载动画
    element.classList.add('fadeIn');
}

/**
 * 站点运行时间
 */
function siteTime() {
    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const years = days * 365;
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    const todayHour = today.getHours();
    const todayMinute = today.getMinutes();
    const todaySecond = today.getSeconds();
    /* Date.UTC() -- 返回date对象距世界标准时间(UTC)1970年1月1日午夜之间的毫秒数(时间戳)
    year - 作为date对象的年份，为4位年份值
    month - 0-11之间的整数，做为date对象的月份
    day - 1-31之间的整数，做为date对象的天数
    hours - 0(午夜24点)-23之间的整数，做为date对象的小时数
    minutes - 0-59之间的整数，做为date对象的分钟数
    seconds - 0-59之间的整数，做为date对象的秒数
    microseconds - 0-999之间的整数，做为date对象的毫秒数 */
    const t1 = Date.UTC(2017, 1, 4, 0, 0, 0, 0); //建站时间
    const t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond);
    const diff = t2 - t1;
    const diffYears = Math.floor(diff / years);
    const diffDays = Math.floor((diff / days) - diffYears * 365);
    const diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours);
    const diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes);
    const diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours - diffMinutes * minutes) / seconds);
    $('#website-time').html(" Run for " + diffYears + " Year " + diffDays + " Days " + diffHours + " Hours " + diffMinutes + " m " + diffSeconds + " s");

    window.setTimeout(siteTime, 1000);
}

function fix404Bug() {
    let children = $('.site-nav .menu-item-links').children();
    children.click(function (event) {
        children.removeAttr("data-pjax-state");
    });
}