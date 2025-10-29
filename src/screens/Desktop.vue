<template>
  <!-- 页面主容器：整张画布（1024x1440），所有元素的定位参照 -->
  <div class="desktop" data-model-id="45:2">
    <!-- 背景装饰SVG（aigei-com-2.svg）：超大幅铺底的装饰图形 -->
    <img class="aigei-com" alt="Aigei com" src="/img/aigei-com-2.svg" />
    <!-- 主背景图层（aigei-com-1.svg）：铺满画布的底图 -->
    <img class="img" alt="Aigei com" src="/img/aigei-com-1.svg" />
    <!-- 地图国家圆点：五个国家中心的小蓝点，可悬停和点击 -->
    <div class="map-dots">
      <button
        v-for="dot in mapDots"
        :key="dot.id"
        class="map-dot"
        :style="{ left: dot.left, top: dot.top }"
        :aria-label="dot.name"
        @click="onDotClick(dot)"
        @mouseenter="onDotHover(dot)" @mouseleave="onDotLeave"
      ></button>
      <!-- 国家简介预览框 -->
            <div
        v-if="hoveredDot"
        class="tooltip tooltip--right"
        :style="{ left: hoveredDot.left, top: hoveredDot.top }"
      >
        <h3 class="tooltip-title">{{ getTooltip(hoveredDot).title }}</h3>
        <p class="tooltip-text">{{ getTooltip(hoveredDot).content }}</p>
      </div>
    </div>
    <!-- 顶部白色导航条背景（rectangle） -->
    <div class="rectangle" />
    <!-- 右上角用户信息区（头像/用户名/分隔线） -->
    <div class="frame">
      <!-- 用户信息一行：左侧图标、用户名、右侧小问号 -->
      <div class="div">
        <!-- 用户头像/应用图标（ps-4.png）32x32 -->
        <img class="ps" alt="Ps" src="/img/ps-4.png" />
        <!-- 用户名文案：kitten123 -->
        <div class="text-wrapper">kitten123</div>
        <!-- 小问号/帮助提示图标（3x图 PNG） -->
        <img class="element-BE" alt="Element BE" src="/img/3-e5-9b-be-e6-a0-87-3x-1.png" />
      </div>
      <!-- 细分隔线（vector-1.svg）位于用户信息区下方 -->
      <img class="vector" alt="Vector" src="/img/vector-1.svg" />
    </div>
    <!-- 顶部中部导航与标题区（胶囊导航 + 左侧标题/Logo） -->
    <div class="group">
      <!-- 导航胶囊容器（灰底圆角条），包含首页/3D展厅/文化对比/时空之旅/每日瑰宝/互动区 -->
      <div class="frame-2">
        <!-- 导航项：当前激活的“首页”（白底，带边框） -->
        <div class="div-wrapper">
          <div class="text-wrapper-2">首页</div>
        </div>
        <!-- 导航项：未激活状态（灰边框） -> 包含 3D展厅 / 文化对比 / 时空之旅 / 每日瑰宝 / 互动区 -->
        <div class="frame-3">
          <div class="text-wrapper-3">3D展厅</div>
        </div>
        <div class="frame-3">
          <div class="text-wrapper-4">文化对比</div>
        </div>
        <div class="frame-3">
          <div class="text-wrapper-4">时空之旅</div>
        </div>
        <div class="frame-3">
          <div class="text-wrapper-4">每日瑰宝</div>
        </div>
        <div class="frame-3">
          <div class="text-wrapper-5">互动区</div>
        </div>
      </div>
      <!-- 左侧标题区：Logo 图标 + 标题“丝路长廊” -->
      <div class="frame-4">
        <!-- 标题左侧 Logo 图标（group-1.png）48x48 -->
        <img class="group-2" alt="Group" src="/img/group-1.png" />
        <!-- 标题文字：丝路长廊 -->
        <div class="text-wrapper-6">丝路长廊</div>
      </div>
      <!-- 顶部最左侧小方形图片（mask-group.png），靠近标题区的装饰/徽标 -->
      <img class="mask-group" alt="Mask group" src="/img/mask-group.png" />
    </div>
    <!-- 语言切换文案：中/英 -->
    <p class="p">
      <span class="span">中</span>
      <span class="text-wrapper-7">/英</span>
    </p>
  </div>
</template>

<script>
import DesktopScript from './DesktopScript.js';
export default DesktopScript;
</script>

<style>
/* 版面说明：以下样式与上方注释一一对应，便于排版调整 */
/* 页面主容器 */
.desktop {
  background-color: #e1e1e1;
  min-height: 1024px;
  min-width: 1440px;
  position: relative;
  width: 100%;
}

/* 背景装饰SVG（大铺底） */
.desktop .aigei-com {
  height: 100%;
  left: 0;
  right: 0;
  position: absolute;
  top: 0;
  width: absolute;
}

/* 主背景图层 */
.desktop .img {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: absolute;
}

/* 地图国家圆点层：充满画布，允许点击 */
.desktop .map-dots {
  position: absolute;
  inset: 0;
  pointer-events: none; /* 只让圆点本身响应 */
  z-index: 5;
}

/* 单个蓝色圆点（默认 12px，可按需改） */
.desktop .map-dot {
  position: absolute;
  width: 12px;
  height: 15px;
  border-radius: 50%;
  background: #185592;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 2px rgba(19, 70, 121, 0.3);

  pointer-events: auto;
}

/* 顶部白色导航条背景 */
.desktop .rectangle {
background-color: #ffffff;
height: 90px;
left: 0;
position: fixed;
top: 0;
width: 100%;
z-index: 100; /* 顶部悬浮 */
border-radius: 0 0 52px 52px; /* 圆角下缘 */
box-shadow: 4px 12px 9px rgba(50, 20, 6, 0.4); /* 阴影 */
}

/* 右上角用户信息区容器 */
.desktop .frame {
align-items: flex-start;
display: flex;
flex-direction: column;
gap: 12px;
position: fixed;
right: 70px;
top: 30px;
width: 191px;
z-index: 110; /* 盖在顶栏上 */
}

/* 用户信息一行（头像 + 用户名 + 提示图标） */
.desktop .div {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 17.33px;
  position: relative;
  width: 100%;
}

/* 头像/应用图标 */
.desktop .ps {
  height: 32px;
  object-fit: cover;
  position: relative;
  width: 32px;
}

/* 用户名文本 */
.desktop .text-wrapper {
  color: #000000;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 21.3px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.33px;
  position: relative;
  width: fit-content;
}

/* 小问号/帮助图标 */
.desktop .element-BE {
  aspect-ratio: 1;
  height: 26.67px;
  object-fit: cover;
  position: relative;
  width: 26.67px;
}

/* 细分隔线 */
.desktop .vector {
  height: 1.33px;
  margin-bottom: -0.67px;
  position: relative;
  width: 190.67px;
}

/* 顶部中部导航与标题总容器 */
.desktop .group {
height: 72px;
left: calc(50.00% - 700px);
position: fixed;
top: 10px;
width: 983px;
z-index: 110; /* 盖在顶栏上 */
}

/* 导航胶囊容器 */
.desktop .frame-2 {
  align-items: center;
  background-color: #e6e6e6;
  border-radius: 50px;
  display: flex;
  height: 44px;
  left: calc(50.00% - 150px);
  position: absolute;
  top: 14px;
  width: 720px;
  overflow: visible;
}

/* 导航项：激活态（首页） */
.desktop .div-wrapper {
  align-items: center;
  background-color: #ffffff;
  border: 2px solid;
  border-color: #e6e6e6;
  border-radius: 50px;
  display: flex;
  gap: 10px;
  height: 44px;
  justify-content: center;
  padding: 10px 34px;
  position: relative;
  width: 120px;
}

/* 导航文字：首页 */
.desktop .text-wrapper-2 {
  color: #000000;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -2.00px;
  position: relative;
  width: fit-content;
}

/* 导航项：未激活态 */
.desktop .frame-3 {
  align-items: center;
  border: 2px solid;
  border-color: #e6e6e6;
  border-radius: 50px;
  display: flex;
  gap: 10px;
  height: 44px;
  justify-content: center;
  padding: 10px 34px;
  position: relative;
  width: 120px;
  background-color: transparent;
}

.desktop .frame-3:hover {
  background-color: #ffffff;
}

.desktop .frame-3:hover .text-wrapper-3,
.desktop .frame-3:hover .text-wrapper-4,
.desktop .frame-3:hover .text-wrapper-5 {
  color: #000000;
}

.desktop .frame-3 {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* 导航文字：3D展厅 */
.desktop .text-wrapper-3 {
  color: #525252;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-left: -10.50px;
  margin-right: -10.50px;
  margin-top: -2.00px;
  position: relative;
  width: fit-content;
}

/* 导航文字：文化对比 / 时空之旅 / 每日瑰宝（复用） */
.desktop .text-wrapper-4 {
  color: #525252;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-left: -16.00px;
  margin-right: -16.00px;
  margin-top: -2.00px;
  position: relative;
  width: fit-content;
}

/* 导航文字：互动区 */
.desktop .text-wrapper-5 {
  color: #525252;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-left: -8.00px;
  margin-right: -8.00px;
  margin-top: -2.00px;
  position: relative;
  width: fit-content;
}

/* 左侧标题区：Logo + 标题 */
.desktop .frame-4 {
  align-items: center;
  display: inline-flex;
  gap: 12px;
  left: 36px;
  position: absolute;
  top: 10px;
}

/* 标题左侧 Logo 图标 */
.desktop .group-2 {
  height: 48px;
  position: relative;
  width: 48px;
}

/* 标题文字：丝路长廊 */
.desktop .text-wrapper-6 {
  color: #2b2b2b;
  font-family: 'Ma Shan Zheng', 'Source Han Sans CN', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  font-size: 45px;
  font-weight: 450;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1.00px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

/* 顶部最左侧小方形图片 */
.desktop .mask-group {
  height: 72px;
  left: 0;
  position: absolute;
  top: 0;
  width: 90px;
}

/* 语言切换容器：中/英 */
.desktop .p {
color: transparent;
font-family: "Source Han Sans CN-Medium", Helvetica;
font-size: 20px;
font-weight: 500;
left: 1150px;
letter-spacing: 0;
line-height: normal;
position: fixed;
top: 40px;
z-index: 110; /* 盖在顶栏上 */
}

/* 语言切换：中 */
.desktop .span {
  color: #000000;
}

/* 语言切换：英（小字号） */
.desktop .text-wrapper-7 {
  color: #939393;
  font-size: 10px;
}

/* 导航项基础过渡设置，保证悬停有动画 */
.desktop .frame-3,
.desktop .div-wrapper,
.desktop .map-dot {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  will-change: transform;
  transform-origin: center;
  cursor: pointer;
  position: relative; /* 便于 z-index 生效 */
  z-index: 1;
}

/* 导航项悬停放大效果 */
.desktop .frame-3:hover,
.desktop .div-wrapper:hover,
.desktop .map-dot:hover {
  transform: scale(1.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 10;
}

/* 国家简介提示框样式 */
.desktop .tooltip {
  position: absolute;
  transform: translate(-50%, -110%);
  background: #ffffff;
  color: #000000;
  border-radius: 10px;
  padding: 16px;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 20;
}

.desktop .tooltip-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

/* 靠右显示，避免遮挡，且不抢事件避免闪烁 */
.desktop .tooltip--right {
  transform: translate(14px, -100%); /* 向右偏移，垂直居中于圆点 */
  max-width: 320px;
  pointer-events: none; /* 悬停时不抢事件，避免闪烁 */
}

.desktop .tooltip-text {
  font-size: 13px;
  line-height: 1.5;
  text-align: justify;
}

/* 占位：避免内容被固定顶栏遮挡 */
.desktop { padding-top: 120px; }
</style>