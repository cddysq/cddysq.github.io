let errorCount = 0;
requestHitokoto();

function requestHitokoto() {
    fetch('https://v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
            $('#hitokoto_content').text(data.hitokoto);
            const author = !!data.from ? data.from : "无名氏";
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

const pageX = $(document).width();
const pageY = $(document).height();
let mouseY = 0;
let mouseX = 0;
$(document).mousemove(function (event) {
    mouseX = event.pageX / -pageX;
    xAxis = -mouseX * 100 - 100;
    mouseY = event.pageY;
    yAxis = (pageY / 2 - mouseY) / pageY * 300;
    $('.box-ghost-eyes').css({'transform': 'translate(' + xAxis + '%,-' + yAxis + '%)'})
});