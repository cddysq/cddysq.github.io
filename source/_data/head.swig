{% if theme.huibai.enable %}
<link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/gh/malaohu/jscdn/grey.css"/>
{% endif %}
<!-- 看板娘需要jQuery支持 -->
<script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
<!--搞怪欺骗-->
<script type="text/javascript" src="/js/funny_title.js"></script>

<!-- 引入看板娘 -->
{% if theme.live2d.enable %}
<script src="https://cdn.jsdelivr.net/gh/CodeHaotian/live2d-widget@latest/autoload.js"></script>
{% endif %}