{# 页面点击小红心 #}
{% if theme.clicklove %}
      <script type="text/javascript" src="/js/clicklove.js"></script>
{% endif %}

{# 动态背景 #}
<div class="bg_content">
  <canvas id="canvas"></canvas>
</div>
{% if theme.canvas %}
   <script type="text/javascript" src="/js/dynamic_bg.js"></script>
{% endif %}

{# APlayer 播放器 #}
{% if theme.aplayer %}
<!-- require APlayer -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
<!-- require MetingJS -->
<script src="https://cdn.jsdelivr.net/npm/meting@1.2.0/dist/Meting.min.js"></script>
<!--如果将本体放在body里面，导致页面加载出现问题，请尝试放到body体后面-->
<div class="aplayer" 
	data-id="3778678" 
	data-server="netease" 
	data-type="playlist" 
	data-fixed="true"	
	data-order="random"
	data-volume="0.65"
	data-autoplay="false"   
	date-preload="auto"
	data-theme="#cc543a">
</div>
{% endif %}
