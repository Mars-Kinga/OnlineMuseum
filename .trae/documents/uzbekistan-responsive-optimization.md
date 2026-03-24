# 乌兹别克斯坦页面响应式优化计划 (Uzbekistan Page Responsive Optimization Plan)

## 目标 (Objective)
重构 `public/legacy/uzbekistan/index.html`、`index.css` 和 `index.js`，移除对绝对定位和固定宽高的硬编码依赖。通过引入 Flexbox/Grid 和媒体查询，实现页面在不同分辨率下的自适应，并针对横屏（Landscape）和竖屏（Portrait）提供不同的布局设计，确保内容显示合理。

## 具体步骤 (Implementation Steps)

### 1. HTML 结构重构 (HTML Structure Refactoring)
- **视口配置**: 完善 `<meta name="viewport">` 确保移动端正确缩放。
- **地图与按钮区域**: 将地图 `.pic-3` 和左侧的按钮 `.box-3` 包裹在一个新的 `.map-wrapper` 容器中。这样可以将地图作为一个整体进行相对定位和响应式缩放。
- **底部信息展示区**: 清理 `.group` 内部的结构，去除各子元素（`.pic-4`, `.img-3`, `.rectangle` 等）上的行内绝对定位样式，为后续使用 Flexbox/Grid 布局做准备。

### 2. CSS 样式重构与响应式适配 (CSS Refactoring & Breakpoints)
修改 `public/legacy/uzbekistan/index.css`，重构基础样式并引入媒体查询 `@media screen and (orientation: portrait)` 以及针对小屏幕的断点：
- **全局与基础**: 
  - 将 `.box-2`, `.section-4`, `.group` 的固定宽高改为 `width: 100%; max-width: 1200px; height: auto;`。
- **横屏布局 (Landscape)**:
  - 维持现有的大体并排布局，使用 Flexbox 保证容器居中和按比例缩放。
  - 右侧详细信息弹窗 `.section` 维持从右侧滑出的动画 (`translateX(100%)`)。
  - 底部模块 `.group` 使用 `display: flex` 水平排列。
- **竖屏布局 (Portrait / Mobile)**:
  - **顶部导航 (`.box`)**: 减小 padding，缩小字体，适应窄屏幕宽度。
  - **主体地图区**: `.map-wrapper` 占满屏幕宽度，高度按比例自动计算（使用 `aspect-ratio`）。左侧按钮 `.box-3` 改为水平排列，放置在地图上方或下方，方便触摸。
  - **详情弹窗 (`.section`)**: 改为从底部向上滑出的抽屉式设计（`transform: translateY(100%)` 变为 `0`），宽度 100%，高度自适应，并增加顶部圆角。内部文字和图片宽度改为百分比适应。
  - **底部概况区 (`.section-4` & `.group`)**: 容器高度改为自适应（`auto`）。内部的分类卡片（地理、历史、建筑等）改用 CSS Grid 网格布局（例如 2列 或 横向滚动），文字介绍容器 `.rectangle` 宽度 100% 并在模块最下方显示。

### 3. JavaScript 逻辑适配 (JavaScript Logic Adjustments)
修改 `public/legacy/uzbekistan/index.js` 以配合新的响应式结构：
- **地图圆点动态定位**: 
  - 将硬编码的 `top` 和 `left` 像素值转换为百分比（基于原图宽 880px，高 473px），例如：`left: (150/880)*100 + '%'`。
  - 将生成的圆点 (`dot`) 和提示框 (`tooltip`) 追加到 `.pic-3`（地图容器）内部，而不是之前粗暴的 `.box-2` 外层容器，确保在地图进行缩放时，圆点能完美贴合地图对应的地理位置。
- **交互逻辑**: 确保详情弹窗 `.section.visible` 的切换逻辑在竖屏（抽屉式）和横屏（侧滑式）下均能正确触发对应的 CSS 动画。
- **内容图动态显示**: 修正详情页面内容切换时图片的显示与隐藏逻辑，保证移动端和桌面端切换顺畅。