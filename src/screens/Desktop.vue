<template>
  <!-- 页面主容器：全屏自适应，不滚动 -->
  <div class="desktop" data-model-id="45:2">
    <!-- 地图滚动区域 -->
    <div class="scroll-container">
      <div class="map-wrapper">
        <!-- 背景装饰SVG（aigei-com-2.svg）：超大幅铺底的装饰图形 -->
        <img class="aigei-com" alt="Aigei com" src="/img/aigei-com-2.svg" />
        <!-- 主背景图层（aigei-com-1.svg）：铺满画布的底图 -->
        <img class="img" alt="Aigei com" src="/img/aigei-com-1.svg" />
        <!-- 红色折线图层 -->
        <img class="red-polyline" alt="Red polyline" src="/img/red-polyline.svg" />
        <!-- 地图国家圆点：五个国家中心的小蓝点，可悬停和点击 -->
        <div class="map-dots">
          <button
            v-for="dot in mapDots"
            :key="dot.id"
            class="map-dot"
            :style="{ left: dot.left, top: dot.top }"
            :aria-label="dot.name"
            @click.stop="toggleDot(dot)"
            @mouseenter="hoveredDot = dot"
            @mouseleave="hoveredDot = null"
          ></button>
          <!-- 国家简介预览框 -->
          <div
            v-if="activeDot || hoveredDot"
            class="tooltip tooltip--right"
            :style="{
              left: (activeDot || hoveredDot).left,
              top: (activeDot || hoveredDot).top,
            }"
          >
            <h3 class="tooltip-title">
              {{ getTooltip(activeDot || hoveredDot).title }}
            </h3>
            <p class="tooltip-text">
              {{ getTooltip(activeDot || hoveredDot).content }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 顶部白色导航条背景 -->
    <header class="header-container">
      <!-- 左侧标题区：Logo 图标 + 标题"丝路长廊" -->
      <div class="header-left">
        <div class="frame-4">
          <!-- 标题左侧 Logo 图标（mask-group.png） -->
          <img class="mask-group" alt="Mask group" src="/img/mask-group.png" />
          <!-- 标题文字：丝路长廊 -->
          <div class="text-wrapper-6">丝路长廊</div>
        </div>
      </div>

      <!-- 顶部中部导航与标题区 -->
      <div class="header-center">
        <div class="group">
          <!-- 导航胶囊容器（灰底圆角条），包含首页/3D展厅/文化对比/时空之旅/每日瑰宝/互动区 -->
          <div class="frame-2">
            <!-- 导航项：当前激活的"首页"（白底，带边框） -->
            <div class="div-wrapper">
              <div class="text-wrapper-2">首页</div>
            </div>
            <!-- 导航项：未激活状态（灰边框）-> 包含 3D展厅 / 文化对比 / 时空之旅 / 每日瑰宝 / 互动区 -->
            <div class="frame-3">
              <div class="text-wrapper-3">3D展厅</div>
            </div>
            <div class="frame-3">
              <div class="text-wrapper-4">文化对比</div>
            </div>
            <div class="frame-3">
              <div class="text-wrapper-5">时空之旅</div>
            </div>
            <div class="frame-3">
              <div class="text-wrapper-5">每日瑰宝</div>
            </div>
            <div class="frame-3">
              <div class="text-wrapper-5">互动区</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右上角用户信息区（头像/用户名/分隔线） -->
      <div class="header-right">
        <!-- 语言切换文案：中/英 -->
        <div class="p">
          <span class="span">中</span>
          <span class="text-wrapper-7">/英</span>
        </div>
        <!-- 用户信息区容器 -->
        <div class="frame">
          <!-- 用户信息一行：左侧图标、用户名、右侧小问号 -->
          <div class="div">
            <!-- 用户头像/应用图标（ps-4.png）32x32 -->
            <img class="ps" alt="Ps" src="/img/ps-4.png" />
            <!-- 用户名文案：kitten123 -->
            <div class="text-wrapper">kitten123</div>
            <!-- 小问号/帮助提示图标（3x图 PNG） -->
            <img
              class="element-BE"
              alt="Element BE"
              src="/img/3-e5-9b-be-e6-a0-87-3x-1.png"
            />
          </div>
          <!-- 细分隔线（vector-1.svg）位于用户信息区下方 -->
          <img class="vector" alt="Vector" src="/img/vector-1.svg" />
        </div>
      </div>

      <!-- 汉堡菜单按钮：移动端显示 -->
      <button class="hamburger-btn" @click="isMenuOpen = !isMenuOpen">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </header>

    <!-- 移动端菜单：汉堡菜单展开时显示 -->
    <div class="mobile-menu" :class="{ open: isMenuOpen }">
      <!-- 移动端用户信息区 -->
      <div class="mobile-user-section">
        <div class="p">
          <span class="span">中</span>
          <span class="text-wrapper-7">/英</span>
        </div>
        <div class="frame">
          <div class="div">
            <img class="ps" alt="Ps" src="/img/ps-4.png" />
            <div class="text-wrapper">kitten123</div>
            <img
              class="element-BE"
              alt="Element BE"
              src="/img/3-e5-9b-be-e6-a0-87-3x-1.png"
            />
          </div>
        </div>
      </div>
      <!-- 移动端导航 -->
      <div class="mobile-nav">
        <div class="nav-item active">首页</div>
        <div class="nav-item">3D展厅</div>
        <div class="nav-item">文化对比</div>
        <div class="nav-item">时空之旅</div>
        <div class="nav-item">每日瑰宝</div>
        <div class="nav-item">互动区</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

// 路由实例
const router = useRouter();

// 汉堡菜单开关状态
const isMenuOpen = ref(false);
// 当前悬停的地图圆点
const hoveredDot = ref(null);
// 当前激活的地图圆点
const activeDot = ref(null);
// 是否为移动端（宽度 <= 768px）
const isMobile = ref(window.innerWidth <= 768);

// 处理窗口大小变化，更新移动端状态
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
};

// 组件挂载时添加窗口大小监听
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

// 组件卸载时移除窗口大小监听
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// 五个国家中心点的位置（基于自适应后的精确百分比）
const mapDots = ref([
  {
    id: "kz",
    name: "哈萨克斯坦",
    left: "24.72%", // 基于 path BBox 几何中心
    top: "37.13%",
    title: "哈萨克斯坦",
    content: `哈萨克斯坦
作为世界最大的内陆国，哈萨克斯坦地处中亚北部。
历史上，这片土地是游牧文明的摇篮，先后被突厥汗国、蒙古帝国统治，18世纪后逐渐纳入沙俄与苏联版图，直至1991年独立。作为丝绸之路的北方草原通道，这里曾是商队穿梭、连接东西的走廊，古老的突厥石碑铭刻着过往的繁荣。历史上，这里经历了从萨满信仰到伊斯兰教的缓慢渗透，游牧传统与伊斯兰文化相互融合，最终形成了独特的哈萨克民俗。
作为中亚的经济引擎，哈萨克斯坦依托丰富的石油、矿产资源推动贸易，同时借助欧亚陆路枢纽地位积极参与"一带一路"，复兴古丝绸之路的商贸脉络。其境内城市阿拉木图更是丝绸之路上的历史重镇，连接东西方文明千年。`,
  },
  {
    id: "uz",
    name: "乌兹别克斯坦",
    left: "21.00%", // 视觉向西微调
    top: "50.53%",
    title: "乌兹别克斯坦",
    content: `乌兹别克斯坦
乌兹别克斯坦位于中亚腹地，这里是中亚文明的心脏地带，撒马尔罕、布哈拉等古城曾是丝绸之路上璀璨的明珠，它们见证了帖木儿帝国的辉煌与波斯、伊斯兰文化的交融。传统手工艺如丝绸纺织、陶瓷制作延续至今，热闹的巴扎与抓饭盛宴更是彰显了当地的淳朴民风。
作为古丝路的核心枢纽，乌兹别克斯坦曾是波斯、希腊、中华和印度文明的交汇熔炉。帖木儿帝国时期建立的宏伟清真寺与经学院，标志着伊斯兰文化在此达到鼎盛，并吸收了各地的建筑与艺术精华。
如今，该国通过出口棉花、黄金及能源拓展贸易，并借力丝绸之路遗产发展旅游与经济走廊，重塑中亚交通纽带的角色。`,
  },
  {
    id: "tm",
    name: "土库曼斯坦",
    left: "16.00%", // 视觉向西微调
    top: "55.01%",
    title: "土库曼斯坦",
    content: `土库曼斯坦
土库曼斯坦西邻里海，卡拉库姆沙漠覆盖大部分国土。在此，部落文化根基深厚，地毯编织与阿哈尔捷金马（亦称汗血宝马）的养殖是国家的文化符号。这片土地曾是丝路商队穿越卡拉库姆沙漠的重要补给站，将中亚的绿洲城市与里海、高加索地区相连。历史上，古老的草原部落传统与后来传入的伊斯兰苏菲派信仰相互交织，形成了土库曼人特有的部落文化与宗教信仰体系。古丝绸之路途径梅尔夫等绿洲城市贯通此地，现今则通过能源管道与跨境运输线，延续着东西方交换的使命。`,
  },
  {
    id: "tj",
    name: "塔吉克斯坦",
    left: "26.50%", // 视觉向西微调（原几何中心29.72%偏东）
    top: "55.45%",
    title: "塔吉克斯坦",
    content: `塔吉克斯坦
塔吉克斯坦坐拥帕米尔高原的壮丽山川，山地占其总面积九成，被称为"中亚屋脊"。其文化深受波斯传统影响，波斯语为官方语言，诺鲁孜节与古典诗歌始终是当地人民的生活精髓。
帕米尔高原通道作为连接中国与波斯的关键路途，商队们不仅带来了货物，也曾使琐罗亚斯德教、佛教和摩尼教在此流行，最终伊斯兰文化通过萨曼王朝的统治在这里深深扎根。如今，中塔合作正重启这条古道，助力贸易与基础设施建设。`,
  },
  {
    id: "kg",
    name: "吉尔吉斯斯坦",
    left: "28.00%", // 视觉向西微调
    top: "50.75%",
    title: "吉尔吉斯斯坦",
    content: `吉尔吉斯斯坦
吉尔吉斯斯坦以天山山脉的雄奇风光闻名，湖泊与牧场滋养着游牧传统，伊塞克湖更是古商道上的明珠。这片天山脚下的土地是游牧文化与定居文明交汇的前沿。这里，伟大的史诗《玛纳斯》不仅是一部文学作品，更是承载着吉尔吉斯人历史、萨满信仰与后来伊斯兰化过程的文化宝库。
作为丝绸之路的山区要冲，碎叶城（即托克马克）曾见证过唐代东西文化交流。如今，中吉乌铁路等项目正重新激活这条走廊，推动区域互联互通。`,
  },
]);

// 切换地图圆点的激活状态与页面跳转
const toggleDot = (dot) => {
  // 如果点击的是乌兹别克斯坦，则跳转到国家页面
  if (dot.id === "uz") {
    router.push({ name: "Uzbekistan" });
    return;
  }
  
  // 如果点击的是哈萨克斯坦，则跳转到国家页面
  if (dot.id === "kz") {
    router.push({ name: "Kazakhstan" });
    return;
  }

  // 对于其他国家，仅切换信息框显示
  if (activeDot.value?.id === dot.id) {
    activeDot.value = null;
  } else {
    activeDot.value = dot;
  }
};

// 获取提示框的位置：根据圆点位置决定提示框显示方向
const getTooltipPosition = (dot) => {
  if (!dot) return "";

  const left = parseFloat(dot.left);
  const top = parseFloat(dot.top);

  if (left < 20) return "tooltip--right";
  if (left > 80) return "tooltip--left";
  if (top < 30) return "tooltip--bottom";
  return "tooltip--top";
};

// 获取提示框的标题和内容
const getTooltip = (dot) => {
  return { title: dot.title || dot.name, content: dot.content || "" };
};
</script>

<style>
/* 版面说明：以下样式与上方注释一一对应，便于排版调整 */
/* 页面主容器 */
.desktop {
  background-color: #e1e1e1;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

/* 新增滚动容器 */
.scroll-container {
  width: 100%;
  height: 100vh;
  overflow: auto;
}

/* 新增地图包裹容器 */
.map-wrapper {
  position: relative;
  width: max(100vw, calc(100vh * 1440 / 1024));
  height: max(100vh, calc(100vw * 1024 / 1440));
  margin: 0 auto;
  background-image: url("~@/assets/古书纸3.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 背景装饰SVG（大铺底） */
.map-wrapper .aigei-com {
  height: 100%;
  left: 0;
  right: 0;
  position: absolute;
  top: 0;
  width: 100%;
  object-fit: cover;
  opacity: 0.3;
}

/* 主背景图层 */
.map-wrapper .img {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  object-fit: cover;
  opacity: 0.3;
}

/* 红色折线图层 */
.map-wrapper .red-polyline {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  object-fit: cover;
  z-index: 100;
  pointer-events: none;
  filter: drop-shadow(0 0 2px rgba(255, 0, 0, 0.8));
}

/* 地图国家圆点层：充满画布，允许点击 */
.map-wrapper .map-dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 105;
}

/* 单个蓝色圆点（默认 12px，可按需改） */
.desktop .map-dot {
  position: absolute;
  /* 统一为正圆形，大小相对于视口宽度（vw）进行微小缩放，并保证最小 14px 最大 22px 的合理点击范围 */
  width: clamp(14px, 1.2vw, 22px);
  /* 在 absolute 定位且没有指定 box-sizing 的情况下，最好显式指定 aspect-ratio 来保持绝对正圆 */
  aspect-ratio: 1 / 1;
  height: auto;

  border-radius: 50%;
  background: #185592;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 2px rgba(19, 70, 121, 0.3);
  pointer-events: auto;

  /* 将定位点移动到圆心，确保放大缩小时圆点始终对准坐标中心 */
  transform: translate(-50%, -50%);
}

/* 顶部白色导航条背景 */
.header-container {
  background-color: rgba(255, 255, 255, 0.8);
  background-image: url("~@/assets/古书纸2.jpg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  height: 90px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 110;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 0 0 52px 52px;
  box-shadow: 4px 12px 9px rgba(50, 20, 6, 0.4);
}

/* 左侧标题区容器 */
.header-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: fit-content;
}

/* 顶部中部导航与标题区容器 */
.header-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  flex: 1;
  padding: 0 20px;
}

/* 右上角用户信息区容器 */
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

/* 标题左侧 Logo 图标 */
.desktop .mask-group {
  height: 40px;
  object-fit: cover;
  position: relative;
  width: 40px;
}

/* 标题文字：丝路长廊 */
.desktop .text-wrapper-6 {
  color: #000000;
  font-family: "Ma Shan Zheng", Helvetica;
  font-size: 40px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

/* 用户头像/应用图标 */
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
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

/* 导航胶囊容器 */
.desktop .frame-2 {
  align-items: center;
  background-color: #e6e6e6;
  border-radius: 50px;
  display: flex;
  height: 44px;
  position: relative;
  width: auto;
  min-width: fit-content;
  max-width: 720px;
  overflow: hidden;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 2px;
  padding: 0 8px;
}

/* 导航项：激活态（首页） */
.desktop .div-wrapper {
  align-items: center;
  background-color: #ffffff;
  border: 2px solid;
  border-color: #e6e6e6;
  border-radius: 50px;
  display: flex;
  gap: 4px;
  height: 40px;
  justify-content: center;
  padding: 8px 16px;
  position: relative;
  width: 100px;
  min-width: 100px;
  flex-shrink: 0;
}

/* 导航文字：首页 */
.desktop .text-wrapper-2 {
  color: #000000;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -2px;
  position: relative;
  width: fit-content;
  white-space: nowrap;
}

/* 导航项：未激活态 */
.desktop .frame-3 {
  align-items: center;
  border: 2px solid;
  border-color: #e6e6e6;
  border-radius: 50px;
  display: flex;
  gap: 4px;
  height: 40px;
  justify-content: center;
  padding: 8px 16px;
  position: relative;
  width: 100px;
  min-width: 100px;
  background-color: transparent;
  flex-shrink: 0;
}

/* 导航项悬停效果 */
.desktop .frame-3:hover {
  background-color: #ffffff;
}

/* 导航文字：3D展厅 / 文化对比 / 时空之旅 / 每日瑰宝 / 互动区 */
.desktop .text-wrapper-3,
.desktop .text-wrapper-4,
.desktop .text-wrapper-5 {
  color: #000000;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -2px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

/* 左侧标题区：Logo + 标题 */
.desktop .frame-4 {
  align-items: center;
  display: inline-flex;
  gap: 13px;
}

/* 右上角用户信息区容器 */
.desktop .frame {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 用户信息一行（头像 + 用户名 + 提示图标） */
.desktop .div {
  align-items: center;
  display: inline-flex;
  gap: 16px;
  position: relative;
}

/* 语言切换容器：中/英 */
.desktop .p {
  color: transparent;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
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
  position: relative;
  z-index: 1;
}

/* 对于 map-dot，因为前面加了 translate(-50%, -50%) 居中，hover时需要保留该变换 */
.desktop .map-dot:hover {
  transform: translate(-50%, -50%) scale(1.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 10;
}

/* 导航项悬停放大效果 */
.desktop .frame-3:hover,
.desktop .div-wrapper:hover {
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

/* 提示框标题 */
.desktop .tooltip-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

/* 靠右显示，避免遮挡，且不抢事件避免闪烁 */
.desktop .tooltip--right {
  transform: translate(14px, -100%);
  max-width: 320px;
  pointer-events: none;
}

/* 提示框文本 */
.desktop .tooltip-text {
  font-size: 13px;
  line-height: 1.5;
  text-align: justify;
}

/* 汉堡菜单按钮 */
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  gap: 6px;
  z-index: 120;
}

/* 汉堡菜单线条 */
.hamburger-line {
  width: 28px;
  height: 3px;
  background-color: #000;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* 移动端菜单 */
.mobile-menu {
  display: none;
  position: fixed;
  top: 90px;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

/* 移动端菜单展开状态 */
.mobile-menu.open {
  max-height: 500px;
}

/* 移动端用户信息区 */
.mobile-user-section {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
}

/* 移动端用户信息区的语言切换 */
.mobile-user-section .p {
  color: #000000 !important;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  opacity: 1 !important;
}

/* 移动端用户信息区的"中" */
.mobile-user-section .span {
  color: #000000 !important;
}

/* 移动端用户信息区的"/英" */
.mobile-user-section .text-wrapper-7 {
  color: #939393 !important;
  font-size: 12px !important;
}

/* 移动端用户信息区的容器 */
.mobile-user-section .frame {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 12px;
}

/* 移动端用户信息区的用户信息 */
.mobile-user-section .div {
  align-items: center;
  display: inline-flex;
  gap: 12px;
}

/* 移动端用户信息区的头像 */
.mobile-user-section .ps {
  height: 32px;
  object-fit: cover;
  width: 32px;
}

/* 移动端用户信息区的用户名 */
.mobile-user-section .text-wrapper {
  color: #000000;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 14px;
  font-weight: 500;
}

/* 移动端用户信息区的小问号 */
.mobile-user-section .element-BE {
  aspect-ratio: 1;
  height: 24px;
  object-fit: cover;
  width: 24px;
}

/* 移动端用户信息区的分隔线 */
.mobile-user-section .vector {
  display: none;
}

/* 移动端导航 */
.mobile-nav {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 移动端导航项 */
.nav-item {
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

/* 移动端导航项悬停 */
.nav-item:hover {
  background: #f0f0f0;
}

/* 移动端导航项激活 */
.nav-item.active {
  background: #e6e6e6;
}

/* 响应式：宽度 <= 1100px */
@media (max-width: 1100px) {
  .desktop .text-wrapper-6 {
    font-size: 34px;
  }

  .desktop .mask-group {
    height: 34px;
    width: 34px;
  }

  .desktop .frame-2 {
    gap: 1px;
    padding: 0 6px;
  }

  .desktop .frame-3,
  .desktop .div-wrapper {
    padding: 6px 12px;
    width: 90px;
    min-width: 90px;
  }

  .desktop .text-wrapper-3,
  .desktop .text-wrapper-4,
  .desktop .text-wrapper-5,
  .desktop .text-wrapper-2 {
    font-size: 15px;
  }

  .desktop .text-wrapper {
    font-size: 15px;
  }

  .desktop .ps {
    height: 28px;
    width: 28px;
  }

  .desktop .element-BE {
    height: 24px;
    width: 24px;
  }

  .desktop .div {
    gap: 12px;
  }
}

/* 响应式：宽度 <= 1023px */
@media (max-width: 1023px) {
  .desktop .text-wrapper {
    display: none;
  }
}

/* 响应式：宽度 <= 960px */
@media (max-width: 960px) {
  .header-container {
    padding: 0 15px;
  }

  .desktop .frame {
    width: auto;
  }

  .desktop .vector {
    display: none;
  }

  .desktop .text-wrapper-6 {
    font-size: 32px;
  }

  .desktop .mask-group {
    height: 32px;
    width: 32px;
  }

  .desktop .text-wrapper-3,
  .desktop .text-wrapper-4,
  .desktop .text-wrapper-5,
  .desktop .text-wrapper-2 {
    font-size: 14px;
  }

  .desktop .frame-3,
  .desktop .div-wrapper {
    padding: 5px 10px;
    width: 80px;
    min-width: 80px;
  }
}

/* 响应式：宽度 <= 899px */
@media (max-width: 899px) {
  .header-center {
    display: none;
  }
}

/* 响应式：宽度 <= 880px */
@media (max-width: 880px) {
  .header-center {
    padding: 0 10px;
  }

  .desktop .element-BE {
    display: none;
  }

  .desktop .div {
    gap: 0;
  }
}

/* 响应式：宽度 <= 768px（移动端） */
@media (max-width: 768px) {
  .header-container {
    height: 70px;
  }

  .header-center,
  .header-right {
    display: none;
  }

  .hamburger-btn {
    display: flex;
  }

  .mobile-menu {
    display: block;
    top: 70px;
  }

  .desktop .text-wrapper-6 {
    font-size: 28px;
  }

  .desktop .mask-group {
    height: 28px;
    width: 28px;
  }
}

/* 响应式：宽度 <= 576px */
@media (max-width: 576px) {
  .header-container {
    padding: 0 10px;
    width: 100%;
  }

  .desktop .mask-group {
    display: none;
  }

  .desktop .text-wrapper-6 {
    font-size: 26px;
  }
}

/* 响应式：宽度 >= 1920px（大屏） */
@media (min-width: 1920px) {
  .header-container {
    padding: 0 40px;
    width: 100%;
  }

  .desktop .text-wrapper-6 {
    font-size: 52px;
  }

  .desktop .mask-group {
    height: 52px;
    width: 52px;
  }
}
</style>
