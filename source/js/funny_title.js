/* 离开当前页面时修改网页标题，回到当前页面时恢复原来标题 */
$(function () {
    let OriginTitle = document.title;
    let titleTime;
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            document.title = '╭(°A°`)╮ 页面崩溃啦 ~';
            clearTimeout(titleTime);
        } else {
            // $('[rel="icon"]').attr('href', "/images/favicon-32x32.png"); 替换网站icon图标
            document.title = '(ฅ>ω<*ฅ) 噫又好了鸭~' + OriginTitle;
            titleTime = setTimeout(function () {
                document.title = OriginTitle;
            }, 4000);
        }
    });
});
