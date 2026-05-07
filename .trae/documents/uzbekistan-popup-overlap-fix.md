# 乌兹别克斯坦页面弹窗遮挡修复计划 (Uzbekistan Popup Overlap Fix Plan)

## 1. 问题分析 (Problem Analysis)
在竖屏模式下，详情弹窗 `.section` 会被下方的国家概况模块 `.section-4` 遮挡。
- **根源**：`.section` 目前嵌套在 `.box-2` 内部。`.box-2` 的 `z-index` 为 2，而其兄弟节点 `.section-4` 的 `z-index` 为 11。由于父级层级限制，即便给 `.section` 设置再高的 `z-index`，它也会被 `.section-4` 覆盖。
- **目标**：打破当前的层级限制，确保弹窗在任何模式下都能显示在最上层。

## 2. 具体步骤 (Implementation Steps)

### 第一步：调整 HTML 结构 (Adjust HTML Structure)
- **文件**: `public/legacy/uzbekistan/index.html`
- **操作**: 将 `.section` 节点从 `.box-2` 中移出，直接放置在 `.main-container` 下方（建议放在 `.box-2` 之后）。这样 `.section` 将与 `.section-4` 处于同一层叠上下文，或者通过 `fixed` 定位彻底脱离。

### 第二步：优化 CSS 定位逻辑 (Optimize CSS Positioning)
- **文件**: `public/legacy/uzbekistan/index.css`
- **桌面端调整**: 
  - 由于 `.section` 现在相对于 `.main-container` 定位，需确保 `top: 135px; right: 0;` 依然能正确对齐地图区域。
  - 将 `.section` 的 `z-index` 统一提升（例如 `500`），确保高于背景图层（`z-index: 3`）和底部模块（`z-index: 11`）。
- **移动端调整**:
  - 维持 `position: fixed; bottom: 0;` 的抽屉式设计。
  - 确保动画 `transform: translateY(100%)` 切换到 `translateY(0)` 逻辑顺畅。

### 第三步：验证交互逻辑 (Verification)
- **文件**: `public/legacy/uzbekistan/index.js`
- **操作**: 检查 `detailPanel` 的选择器引用是否依然正确（由于使用了类名选择器，结构移动不影响逻辑）。
- **测试**: 在竖屏模式下点击圆点，验证抽屉是否能完整滑出并覆盖在 `.section-4` 之上。

## 3. 预期效果 (Expected Outcome)
弹窗滑出时将始终处于页面最顶层（仅次于顶部导航栏），不会被任何页面内容遮挡，显示完整且交互流畅。