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