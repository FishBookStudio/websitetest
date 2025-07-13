# Google Analytics 埋点功能总结

## 概述

已为网站的所有可点击链接和按钮添加了 `data-track` 属性，完成了完整的 GA 埋点功能。

## 埋点实现方式

### 1. 基础 GA4 配置

```html
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-RL1FM6PSSY"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-RL1FM6PSSY");
</script>
```

### 2. JavaScript 事件监听

在 `main.js` 中实现了三种类型的事件监听：

#### 2.1 普通链接和按钮点击

```javascript
document.querySelectorAll("[data-track]").forEach((btn) => {
  btn.addEventListener("click", function () {
    var trackName = btn.getAttribute("data-track");
    gtag("event", "link_click", {
      event_category: "engagement",
      event_label: trackName,
    });
  });
});
```

#### 2.2 使用 onclick 跳转的元素

```javascript
document
  .querySelectorAll('[onclick*="window.location.href"]')
  .forEach((element) => {
    element.addEventListener("click", function () {
      var trackName = element.getAttribute("data-track");
      if (trackName) {
        gtag("event", "link_click", {
          event_category: "engagement",
          event_label: trackName,
        });
      }
    });
  });
```

#### 2.3 弹窗按钮

```javascript
document.querySelectorAll(".open-modal-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    var trackName = btn.getAttribute("data-track");
    if (trackName) {
      gtag("event", "modal_open", {
        event_category: "engagement",
        event_label: trackName,
      });
    }
  });
});
```

## 已添加埋点的元素

### 1. 导航栏链接

- `nav_home` - HOME 链接
- `nav_widget` - WIDGET 链接
- `nav_blog` - BLOG 链接
- `nav_store` - STORE 链接
- `nav_contact` - CONTACT 链接

### 2. 主要行动按钮

- `hero_get_start` - 首页"get start"按钮
- `search_button` - 搜索按钮

### 3. 产品分类链接

- `domain_tutorial` - 教程
- `domain_template` - 模版
- `domain_widget` - 小组件
- `domain_notes` - 笔记
- `domain_marginnote` - MarginNote
- `domain_mindmap` - 思维导图

### 4. 产品购买按钮

- `leetcode_buy_now` - LeetCode Study Planner 购买按钮
- `library_buy_now` - Notion Library 2.0 购买按钮
- `fitness_buy_now` - 2025 Fitness Planner 购买按钮
- `12week_buy_now` - 12 Week Year Planner 购买按钮

### 5. 定制服务按钮

- `service_basic` - 基础版服务
- `service_premium` - 高级版服务
- `service_enterprise` - 企业版服务

### 6. 页脚链接

#### 社交媒体

- `footer_xiaohongshu` - 小红书
- `footer_bilibili` - Bilibili
- `footer_wechat` - 公众号

#### 最新文章

- `footer_article_joy` - 错失的喜悦
- `footer_article_happy` - 一些快乐秘籍
- `footer_article_books` - 最近读的一些书

#### 笔记分享

- `footer_notes_frontend` - 前端笔记
- `footer_notes_deeplearning` - 深度学习
- `footer_notes_computer` - 计算机八股文

#### 联系信息

- `footer_contact_business` - 商务合作
- `footer_contact_join` - 加入我们
- `footer_contact_feedback` - 意见箱

## 事件类型

### 1. link_click

用于普通链接和按钮点击，包括：

- 导航链接
- 产品分类链接
- 购买按钮
- 页脚链接

### 2. modal_open

用于弹窗按钮点击，包括：

- 定制服务按钮

## GA4 事件参数

所有事件都包含以下参数：

- `event_category`: 'engagement' (用于 link_click) 或 'engagement' (用于 modal_open)
- `event_label`: 具体的埋点标识符

## 数据查看

在 Google Analytics 4 中，可以通过以下方式查看数据：

1. **实时报告**: 实时查看用户行为
2. **事件报告**: 查看所有自定义事件
3. **探索报告**: 创建自定义分析
4. **转化报告**: 分析用户转化路径

## 注意事项

1. 所有埋点都使用 `data-track` 属性，便于维护和管理
2. 事件名称统一使用 `link_click` 和 `modal_open`，便于数据分析
3. 每个埋点都有唯一的标识符，便于区分不同的用户行为
4. 移除了原有的无效 `trackLinkClick` 函数调用

## 测试建议

1. 在 GA4 实时报告中验证事件是否正确触发
2. 检查所有按钮和链接的点击是否都有对应的埋点数据
3. 验证事件参数是否正确传递
4. 测试不同设备和浏览器的兼容性
