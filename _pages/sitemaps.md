---
layout: page
title: sitemap
permalink: /sitemap/
categories: [catatan]
---

<section class="articles">
  {% for post in site.categories.CATEGORY %}
  <article class="article">
    <h2 class="article-title">
      <a href="{{site.baseurl}}{{post.url}}"> {{post.title}} </a>
    </h2>
    <small class="date">{{post.date | date_to_string}}</small>
    <div class="categories">
      {% for c in post.categories %}
      <a href="#!" data-base-url="{{site.baseurl}}" class="category">{{c}}</a>
      {% endfor %}
    </div>
  </article>
  {% endfor %}
</section>
{% include pagination.html %}

#### header 4
1. tes
    1. tes 1
    1. tes 2
    1. tes 3