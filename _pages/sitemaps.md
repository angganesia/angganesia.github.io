---
layout: page
title: sitemap
permalink: /sitemap/
categories: [catatan]
---

<section class="articles">
  {% for post in paginator.posts %}
  <article class="article">
      <h2 class="categories">
        {% for c in post.categories %}
        <a href="#!" data-base-url="{{site.baseurl}}" class="category">{{c}}</a>
        {% endfor %}
      </h2>
  </article>
  {% endfor %}
</section>
{% include pagination.html %}