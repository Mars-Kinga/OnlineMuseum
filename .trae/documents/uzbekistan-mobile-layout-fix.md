# 乌兹别克斯坦页面移动端布局优化计划 (Uzbekistan Mobile Layout Optimization Plan)

## 目标 (Objective)
优化乌兹别克斯坦页面在竖屏（移动端）模式下的交互体验：
1. 实现地图圆点随地图比例缩放。
2. 确保详情弹窗的内容区域在移动端有足够的高度展示文字（至少 5 行）。

## 具体步骤 (Implementation Steps)

### 1. 修改 JavaScript 逻辑 (Modify JavaScript Logic)
- **文件**: `public/legacy/uzbekistan/index.js`
- **操作**:
  - 为动态生成的地图圆点添加 CSS 类名 `map-dot`。
  - 移除 `dot.style.width` 和 `dot.style.height` 的硬编码赋值，改为通过 CSS 控制。
  - 确保圆点内部的提示框（tooltip）在移动端也能正常适配。

### 2. 优化 CSS 样式 (Optimize CSS Styles)
- **文件**: `public/legacy/uzbekistan/index.css`
- **操作**:
  - **地图圆点自适应**:
    - 在基础样式中定义 `.map-dot`，设置桌面端默认大小（14px）。
    - 在 `@media screen and (max-width: 1024px)` 媒体查询中，将 `.map-dot` 的宽高改为相对于视口宽度的单位（例如 `1.6vw`），使其随地图比例缩放。
  - **内容区域高度优化**:
    - 在移动端媒体查询下，为详情内容容器 `.section-2` 设置 `min-height`（约 200px），确保即便图片较大时，文字区域也能展示至少 5 行内容。
    - 优化 `.section-content-wrapper` 的布局，确保图片和文字在有限的抽屉高度内合理分布。

### 3. 验证与测试 (Verification and Testing)
- 使用浏览器开发者工具模拟不同尺寸的手机竖屏模式。
- 检查地图缩放时圆点大小是否协调。
- 切换不同城市，验证详情弹窗文字区域的高度和滚动是否正常。