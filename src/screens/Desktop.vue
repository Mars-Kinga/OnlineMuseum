<template>
  <div class="desktop" data-model-id="45:2">
    <div class="map-stage" @click="onMapClick">
      <div class="map-wrapper">
        <img
          class="bg-image"
          ref="bgImageRef"
          alt="Background"
          src="/img/aigei-com-2.svg"
        />
        <img
          class="map-image"
          ref="mapImageRef"
          @load="onMapImageLoad"
          alt="Map"
          src="/img/aigei-com-1.svg"
        />
        <div class="map-overlay" ref="mapOverlayRef">
          <button
            v-for="dot in mapDots"
            :key="dot.id"
            class="map-dot"
            :style="getDotStyle(dot)"
            :aria-label="dot.name"
            @click.stop="toggleDot(dot)"
            @mouseenter="hoveredDot = dot"
            @mouseleave="hoveredDot = null"
          ></button>
          <div
            v-if="activeDot || hoveredDot"
            class="tooltip"
            :class="getTooltipPosition(activeDot || hoveredDot)"
            :style="getTooltipStyle(activeDot || hoveredDot)"
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

    <header class="header-container">
      <div class="header-left">
        <div class="frame-4">
          <img class="mask-group" alt="Mask group" src="/img/mask-group.png" />
          <div class="text-wrapper-6">丝路长廊</div>
        </div>
      </div>

      <div class="header-center">
        <div class="group">
          <div class="frame-2">
            <div class="div-wrapper">
              <div class="text-wrapper-2">首页</div>
            </div>
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

      <div class="header-right">
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
          <img class="vector" alt="Vector" src="/img/vector-1.svg" />
        </div>
      </div>

      <button class="hamburger-btn" @click="isMenuOpen = !isMenuOpen">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </header>

    <div class="mobile-menu" :class="{ open: isMenuOpen }">
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

const isMenuOpen = ref(false);
const hoveredDot = ref(null);
const activeDot = ref(null);
const isMobile = ref(window.innerWidth <= 768);
const mapImageRef = ref(null);
const mapOverlayRef = ref(null);
const bgImageRef = ref(null);

const syncOverlayToImage = () => {
  if (!mapImageRef.value || !mapOverlayRef.value) return;

  const imgRect = mapImageRef.value.getBoundingClientRect();
  const wrapperRect = mapImageRef.value.parentElement?.getBoundingClientRect();

  if (!wrapperRect) return;

  const left = imgRect.left - wrapperRect.left;
  const top = imgRect.top - wrapperRect.top;

  mapOverlayRef.value.style.left = `${left}px`;
  mapOverlayRef.value.style.top = `${top}px`;
  mapOverlayRef.value.style.width = `${imgRect.width}px`;
  mapOverlayRef.value.style.height = `${imgRect.height}px`;

  if (bgImageRef.value) {
    const bgRect = bgImageRef.value.getBoundingClientRect();
    console.log("=== Bounding Boxes ===");
    console.log("bgImage:", {
      left: bgRect.left,
      top: bgRect.top,
      width: bgRect.width,
      height: bgRect.height,
    });
    console.log("mapImage:", {
      left: imgRect.left,
      top: imgRect.top,
      width: imgRect.width,
      height: imgRect.height,
    });
    console.log("Overlay position:", {
      left,
      top,
      width: imgRect.width,
      height: imgRect.height,
    });
  }
};

const onMapImageLoad = () => {
  syncOverlayToImage();
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
  syncOverlayToImage();
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  setTimeout(syncOverlayToImage, 100);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const SVG_WIDTH = 1440;
const SVG_HEIGHT = 1024;

const getDotStyle = (dot) => {
  const leftPercent = (dot.x / SVG_WIDTH) * 100;
  const topPercent = (dot.y / SVG_HEIGHT) * 100;
  return {
    left: `${leftPercent}%`,
    top: `${topPercent}%`,
  };
};

const getTooltipPosition = (dot) => {
  if (!dot) return "";

  const left = (dot.x / SVG_WIDTH) * 100;
  const top = (dot.y / SVG_HEIGHT) * 100;

  if (left < 20) return "tooltip--right";
  if (left > 80) return "tooltip--left";
  if (top < 30) return "tooltip--bottom";
  return "tooltip--top";
};

const getTooltipStyle = (dot) => {
  if (!dot) return {};
  const leftPercent = (dot.x / SVG_WIDTH) * 100;
  const topPercent = (dot.y / SVG_HEIGHT) * 100;
  return {
    left: `${leftPercent}%`,
    top: `${topPercent}%`,
  };
};

const mapDots = ref([
  {
    id: "kz",
    name: "哈萨克斯坦",
    x: 360,
    y: 410,
    title: "哈萨克斯坦",
    content: `哈萨克斯坦
作为世界最大的内陆国，哈萨克斯坦地处中亚北部。
历史上，这片土地是游牧文明的摇篮，先后被突厥汗国、蒙古帝国统治，18世纪后逐渐纳入沙俄与苏联版图，直至1991年独立。作为丝绸之路的北方草原通道，这里曾是商队穿梭、连接东西的走廊，古老的突厥石碑铭刻着过往的繁荣。历史上，这里经历了从萨满信仰到伊斯兰教的缓慢渗透，游牧传统与伊斯兰文化相互融合，最终形成了独特的哈萨克民俗。
作为中亚的经济引擎，哈萨克斯坦依托丰富的石油、矿产资源推动贸易，同时借助欧亚陆路枢纽地位积极参与"一带一路"，复兴古丝绸之路的商贸脉络。其境内城市阿拉木图更是丝绸之路上的历史重镇，连接东西方文明千年。`,
  },
  {
    id: "uz",
    name: "乌兹别克斯坦",
    x: 259,
    y: 492,
    title: "乌兹别克斯坦",
    content: `乌兹别克斯坦
乌兹别克斯坦位于中亚腹地，这里是中亚文明的心脏地带，撒马尔罕、布哈拉等古城曾是丝绸之路上璀璨的明珠，它们见证了帖木儿帝国的辉煌与波斯、伊斯兰文化的交融。传统手工艺如丝绸纺织、陶瓷制作延续至今，热闹的巴扎与抓饭盛宴更是彰显了当地的淳朴民风。
作为古丝路的核心枢纽，乌兹别克斯坦曾是波斯、希腊、中华和印度文明的交汇熔炉。帖木儿帝国时期建立的宏伟清真寺与经学院，标志着伊斯兰文化在此达到鼎盛，并吸收了各地的建筑与艺术精华。
如今，该国通过出口棉花、黄金及能源拓展贸易，并借力丝绸之路遗产发展旅游与经济走廊，重塑中亚交通纽带的角色。`,
  },
  {
    id: "tj",
    name: "塔吉克斯坦",
    x: 360,
    y: 563,
    title: "塔吉克斯坦",
    content: `塔吉克斯坦
塔吉克斯坦坐拥帕米尔高原的壮丽山川，山地占其总面积九成，被称为"中亚屋脊"。其文化深受波斯传统影响，波斯语为官方语言，诺鲁孜节与古典诗歌始终是当地人民的生活精髓。
帕米尔高原通道作为连接中国与波斯的关键路途，商队们不仅带来了货物，也曾使琐罗亚斯德教、佛教和摩尼教在此流行，最终伊斯兰文化通过萨曼王朝的统治在这里深深扎根。如今，中塔合作正重启这条古道，助力贸易与基础设施建设。`,
  },
  {
    id: "tm",
    name: "土库曼斯坦",
    x: 216,
    y: 543,
    title: "土库曼斯坦",
    content: `土库曼斯坦
土库曼斯坦西邻里海，卡拉库姆沙漠覆盖大部分国土。在此，部落文化根基深厚，地毯编织与阿哈尔捷金马（亦称汗血宝马）的养殖是国家的文化符号。这片土地曾是丝路商队穿越卡拉库姆沙漠的重要补给站，将中亚的绿洲城市与里海、高加索地区相连。
历史上，古老的草原部落传统与后来传入的伊斯兰苏菲派信仰相互交织，形成了土库曼人特有的部落文化与宗教信仰体系。古丝绸之路途径梅尔夫等绿洲城市贯通此地，现今则通过能源管道与跨境运输线，延续着东西方交换的使命。`,
  },
  {
    id: "kg",
    name: "吉尔吉斯斯坦",
    x: 432,
    y: 492,
    title: "吉尔吉斯斯坦",
    content: `吉尔吉斯斯坦
吉尔吉斯斯坦以天山山脉的雄奇风光闻名，湖泊与牧场滋养着游牧传统，伊塞克湖更是古商道上的明珠。这片天山脚下的土地是游牧文化与定居文明交汇的前沿。这里，伟大的史诗《玛纳斯》不仅是一部文学作品，更是承载着吉尔吉斯人历史、萨满信仰与后来伊斯兰化过程的文化宝库。
作为丝绸之路的山区要冲，碎叶城（即托克马克）曾见证过唐代东西文化交流。如今，中吉乌铁路等项目正重新激活这条走廊，推动区域互联互通。`,
  },
]);

const toggleDot = (dot) => {
  if (activeDot.value?.id === dot.id) {
    activeDot.value = null;
  } else {
    activeDot.value = dot;
  }
};

const onMapClick = (e) => {
  if (!e.target.closest(".map-dot")) {
    activeDot.value = null;
  }
};

const getTooltip = (dot) => {
  return { title: dot.title || dot.name, content: dot.content || "" };
};
</script>

<style scoped>
.desktop {
  background-color: #e1e1e1;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

.desktop .map-stage {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.desktop .map-wrapper {
  position: relative;
  display: inline-block;
}

.desktop .bg-image,
.desktop .map-image {
  display: block;
  width: auto;
  height: auto;
  max-width: 100vw;
  max-height: calc(100vh - 120px);
}

.desktop .bg-image {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.desktop .map-image {
  position: relative;
  z-index: 2;
}

.desktop .map-overlay {
  position: absolute;
  pointer-events: none;
  z-index: 5;
}

.desktop .map-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #185592;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 2px rgba(19, 70, 121, 0.3);
  pointer-events: auto;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transform-origin: center center;
  z-index: 10;
  transition: transform 0.1s ease;
}

.header-container {
  background-color: #ffffff;
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
}

.header-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: fit-content;
}

.header-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  flex: 1;
  padding: 0 20px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.desktop .mask-group {
  height: 40px;
  object-fit: cover;
  position: relative;
  width: 40px;
}

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

.desktop .ps {
  height: 32px;
  object-fit: cover;
  position: relative;
  width: 32px;
}

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

.desktop .element-BE {
  aspect-ratio: 1;
  height: 26.67px;
  object-fit: cover;
  position: relative;
  width: 26.67px;
}

.desktop .vector {
  height: 1.33px;
  margin-bottom: -0.67px;
  position: relative;
  width: 190.67px;
}

.desktop .group {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

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
  width: auto;
  min-width: fit-content;
  flex-shrink: 1;
}

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
  width: auto;
  min-width: fit-content;
  background-color: transparent;
  flex-shrink: 1;
}

.desktop .frame-3:hover {
  background-color: #ffffff;
}

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

.desktop .frame-4 {
  align-items: center;
  display: inline-flex;
  gap: 13px;
}

.desktop .frame {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.desktop .div {
  align-items: center;
  display: inline-flex;
  gap: 16px;
  position: relative;
}

.desktop .p {
  color: transparent;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
}

.desktop .span {
  color: #000000;
}

.desktop .text-wrapper-7 {
  color: #939393;
  font-size: 10px;
}

.desktop .frame-3,
.desktop .div-wrapper {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  will-change: transform;
  transform-origin: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.desktop .map-dot {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  will-change: transform;
  transform-origin: center;
  cursor: pointer;
  z-index: 1;
}

.desktop .frame-3:hover,
.desktop .div-wrapper:hover {
  transform: scale(1.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 10;
}

.desktop .map-dot:hover {
  transform: translate(-50%, -50%) scale(1.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 10;
}

.desktop .tooltip {
  position: absolute;
  background: #ffffff;
  color: #000000;
  border-radius: 10px;
  padding: 16px;
  max-width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  pointer-events: auto;
}

.desktop .tooltip-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.desktop .tooltip-text {
  font-size: 13px;
  line-height: 1.5;
  text-align: justify;
}

.desktop .tooltip--top {
  transform: translate(-50%, calc(-100% - 12px));
}

.desktop .tooltip--top::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #ffffff;
}

.desktop .tooltip--bottom {
  transform: translate(-50%, 12px);
}

.desktop .tooltip--bottom::after {
  content: "";
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #ffffff;
}

.desktop .tooltip--left {
  transform: translate(calc(-100% - 12px), -50%);
}

.desktop .tooltip--left::after {
  content: "";
  position: absolute;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid #ffffff;
}

.desktop .tooltip--right {
  transform: translate(12px, -50%);
}

.desktop .tooltip--right::after {
  content: "";
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid #ffffff;
}

.desktop {
  padding-top: 120px;
}

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

.hamburger-line {
  width: 28px;
  height: 3px;
  background-color: #000;
  border-radius: 2px;
  transition: all 0.3s ease;
}

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

.mobile-menu.open {
  max-height: 500px;
}

.mobile-user-section {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
}

.mobile-user-section .p {
  color: #000000 !important;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  opacity: 1 !important;
}

.mobile-user-section .span {
  color: #000000 !important;
}

.mobile-user-section .text-wrapper-7 {
  color: #939393 !important;
  font-size: 12px !important;
}

.mobile-user-section .frame {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.mobile-user-section .div {
  align-items: center;
  display: inline-flex;
  gap: 12px;
}

.mobile-user-section .ps {
  height: 32px;
  object-fit: cover;
  width: 32px;
}

.mobile-user-section .text-wrapper {
  color: #000000;
  font-family: "Source Han Sans CN-Medium", Helvetica;
  font-size: 14px;
  font-weight: 500;
}

.mobile-user-section .element-BE {
  aspect-ratio: 1;
  height: 24px;
  object-fit: cover;
  width: 24px;
}

.mobile-user-section .vector {
  display: none;
}

.mobile-nav {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.nav-item:hover {
  background: #f0f0f0;
}

.nav-item.active {
  background: #e6e6e6;
}

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

@media (max-width: 1023px) {
  .desktop .text-wrapper {
    display: none;
  }
}

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
  }
}

@media (max-width: 899px) {
  .header-center {
    display: none;
  }
}

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

  .desktop {
    padding-top: 90px;
  }
}

@media (max-width: 576px) {
  .header-container {
    padding: 0 10px;
  }

  .desktop .mask-group {
    display: none;
  }

  .desktop .text-wrapper-6 {
    font-size: 26px;
  }

  .desktop {
    padding-top: 80px;
  }
}

@media (min-width: 1920px) {
  .header-container {
    padding: 0 40px;
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
