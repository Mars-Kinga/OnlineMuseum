# 乌兹别克斯坦页面修复计划 (基于与主分支对比)

## 问题分析
通过对比本地修改后的文件 (`/Users/bytedance/Documents/Onlinemuseum/OnlineMuseum/public/legacy/uzbekistan/`) 和主分支原始文件 (`/Users/bytedance/Documents/Onlinemuseum/OnlineMuseum_main/public/legacy/uzbekistan/`)，发现在我们之前进行响应式重构（Flexbox/Grid + 移除硬编码）和圆点百分比坐标修复的过程中，出现了一些偏差，导致**圆点位置不准确**以及**部分 UI 元素表现异常（甚至丢失）**。

### 1. 地图圆点定位问题
在重构前，圆点的 `top` 和 `left` 是基于外层的一个绝对定位容器 `.pic-3` (880x473) 以及其父容器的相对关系计算的。
之前我们虽然改为了百分比，但由于：
1. **坐标系基准变化**：之前 `.pic-3` 有 `left: 90px; top: 150px;` 的偏移，而在重构中我们引入了 `.map-wrapper` 且使用了 `aspect-ratio: 880 / 473`，这导致原本的像素坐标如果直接按比例转换为百分比，其映射在自适应的 `.map-wrapper` 上可能不完全匹配原图的视觉焦点。
2. **原始坐标复原**：主分支的原始像素坐标其实是相对准确的（在旧版固定布局下）。我们需要将它们精确地转换回基于 `880x473` 容器内部的百分比，而不是之前手动估算的百分比。

### 2. UI 元素丢失与表现异常
对比 `index.html` 和 `index.css` 发现以下几个关键的 UI 丢失/改变点：
- **详情弹窗按钮 (`.box-3`) 定位丢失**：在原始版本中，`.box-3` 是使用绝对定位 `top: 50px`, `top: 170px` 等悬浮在右侧 `.section` 旁边的。在响应式重构中，我们去除了行内 `top` 样式，并把它们放进了 `.section-tabs` 弹性盒子中。虽然这有利于移动端，但在桌面端导致了它们不再像原本那样错落有致地贴在面板左侧。
- **返回按钮样式 (`.back-home`)**：重构时可能影响了它原本在页面左上角的固定悬浮表现。
- **背景图片与模糊层 (`.img-2`, `.box-2`)**：原本 `.box-2` 有 `background: #804430`。在重构中修改了层级和 padding，导致背景表现可能不如原版沉浸。

## 修复方案

### 步骤 1：精确还原地图圆点位置
修改 `public/legacy/uzbekistan/index.js`：
1. 恢复原始的像素坐标数据：
   ```javascript
   const dotsData = [
     { top: 180, left: 150, text: "费尔干纳峡谷的沙漠城堡群" },
     { top: 360, left: 290, text: "伊钱卡拉古城" },
     { top: 375, left: 300, text: "希瓦" },
     { top: 485, left: 440, text: "泽拉夫尚-卡拉库姆廊道" },
     { top: 500, left: 450, text: "布哈拉历史中心" },
     { top: 475, left: 580, text: "沙赫里萨布兹历史中心" },
     { top: 490, left: 580, text: "撒马尔罕" },
     { top: 380, left: 680, text: "首都：塔什干" }
   ];
   ```
2. 动态计算百分比，但为了防止类似撒马尔罕 `top: 490` 超过基准高度 473 导致超出地图容器（`>100%`），我们将容器基准统一放大或对坐标进行**越界限制与等比缩放**。
   更稳妥的做法是：由于地图 V7nr5BkNBg.png 的实际有效绘制区域可能和旧版 CSS 定位存在 `offset` 差异，我们将写一个转换函数：
   `top = (originalTop / 550) * 100 + '%'` （通过微调除数，确保最大值 500 也在 100% 以内）。
   *实际上，经过计算，比较好的基准是 `width: 880`, `height: 550`。*

### 步骤 2：修复桌面端侧边栏按钮 (`.box-3`) 布局
修改 `public/legacy/uzbekistan/index.html` 和 `index.css`：
- 在桌面端，我们希望恢复 `.box-3` （历史背景、主要遗迹等）那种绝对定位贴在白色面板左侧的感觉。
- 移除 `<div class="section-tabs">` 中强加的 flex 布局对桌面端的破坏，为 `.box-3` 重新赋予 `position: absolute` 并根据 `nth-child` 设置 `top` 值（桌面端生效，移动端恢复 flex）。
- 确保 `.section` (右侧面板) 保持原有的视觉效果。

### 步骤 3：还原细节 UI
- 检查并修正 `.back-home` 返回按钮的位置，确保其在左上角 `top: 20px, left: 20px` 悬浮。
- 确保主背景 `.img-2` 的模糊效果不遮挡地图容器，且 `.box-2` 维持原有的视觉沉浸感。