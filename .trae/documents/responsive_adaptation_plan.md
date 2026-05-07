# 自适应修复计划

## 背景与问题描述
在本地分支中，相较于主分支增加了不同网页尺寸的自适应能力，但目前存在以下两个主要问题：
1. **Header 宽度未适配**：由于父容器最小宽度限制（`min-width: 1440px`）导致页面整体横向滚动，`fixed` 定位的 header 未能与设备网页宽度保持一致（在小屏幕上会出现截断现象）。
2. **地图宽度超出限制**：由于地图被设置了固定的最小宽高，在小屏幕设备上不仅会超出宽度，高度也会产生不必要的滚动。需要修改为高度随设备视口（100vh）自适应最大化，宽度等比例缩放，并支持左右滑动查看完整地图。

## 修复方案设计

为了解决上述问题，我们需要对 `/src/screens/Desktop.vue` 中的 HTML 结构和 CSS 样式进行调整，将“地图区域”和“全局页面”解耦：

### 1. 修改 HTML 结构
- 在 `.desktop` 容器内部，将地图相关的元素（两张背景图 `aigei-com-2.svg`、`aigei-com-1.svg` 以及交互圆点层 `.map-dots`）用两个新容器包裹：
  - **外层滚动容器 `.scroll-container`**：负责限制在视口大小内，并提供横向滚动能力。
  - **内层地图容器 `.map-wrapper`**：负责根据视口高度（100vh）和原始图片的宽高比（1440/1024 = 1.40625）动态计算宽度，从而保证地图图片不变形、交互点位置不偏移。

### 2. 更新 CSS 样式
- **全局容器 `.desktop`**：
  - 移除原有的 `min-width: 1440px` 和 `min-height: 1024px`，确保外层不产生整体滚动。
  - 移除 `padding-top: 120px`（以及媒体查询中对应的覆盖），改为 `height: 100vh; width: 100%; overflow: hidden;`。
- **新增 `.scroll-container` 样式**：
  - 设置 `width: 100%; height: 100vh; overflow-x: auto; overflow-y: hidden;`，使其成为唯一的横向滚动区域。
- **新增 `.map-wrapper` 样式**：
  - 设置 `height: 100vh;` 和 `width: max(100vw, calc(100vh * 1440 / 1024));`。这保证了地图高度始终最大化，宽度按比例缩放，同时在极宽屏幕下（如 16:9 桌面端）不小于屏幕宽度（保持原有的横向拉伸覆盖特性）。
- **更新地图图片与节点样式选择器**：
  - 将 `.desktop .aigei-com`、`.desktop .img`、`.desktop .map-dots` 等选择器中的前缀更新为适配新的 DOM 结构（如改为 `.map-wrapper .aigei-com`），并确保它们使用 `width: 100%; height: 100%;` 充满包裹容器。

## 实施步骤
1. 打开 `/src/screens/Desktop.vue` 文件。
2. 使用 `SearchReplace` 工具，更新 `<template>` 中的 DOM 结构，增加 `.scroll-container` 和 `.map-wrapper`。
3. 使用 `SearchReplace` 工具，修改 `<style>` 中的 `.desktop` 样式，移除宽高的写死限制与内边距。
4. 使用 `SearchReplace` 工具，在样式中添加 `.scroll-container` 和 `.map-wrapper` 相关的 CSS 规则。
5. 使用 `SearchReplace` 工具，更新原本地图图片与节点（`.aigei-com`, `.img`, `.map-dots`）的 CSS 选择器与定位。
6. 使用 `SearchReplace` 工具，清理媒体查询（`@media`）中针对 `.desktop` 设定的 `padding-top`。
7. 启动本地服务并预览验证修复效果（地图可横向滑动且高满屏，header在小屏下宽度100%不再截断）。
