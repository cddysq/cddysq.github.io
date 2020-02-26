{% if theme.recent_posts %}
    <div class="links-of-blogroll motion-element {{ "links-of-blogroll-" + theme.recent_posts_layout  }}">
      <div class="links-of-blogroll-title">
		<!-- 选择合适的icon -->
        <i class="fa fa-history fa-{{ theme.recent_posts_icon | lower }}" aria-hidden="true"></i>
		<!-- 这里对应下文主题配置文件的recent_posts_title值 -->
        {{ theme.recent_posts_title }}
      </div>
      <ul class="links-of-blogroll-list">
		<!-- 文章排序规格，-updated 按照文章更新时间倒排 -->
        {% set posts = site.posts.sort('-updated').toArray() %}
		 <!-- 显示四条近期文章-->
        {% for post in posts.slice('0', '4') %}
          <li>
            <a href="{{ url_for(post.path) }}" title="{{ post.title }}" target="_blank">{{ post.title }}</a>
          </li>
        {% endfor %}
      </ul>
    </div>
{% endif %}