<template>
  <div class="main-container">
    <div class="box">
      <span class="text">乌兹别克斯坦 Узбекистан</span>
      <div class="wrapper">
        <div class="wrapper-2">
          <div class="img"></div>
          <span class="text-2">用户名</span>
          <div class="pic" @click="toggleUserPopup"></div>
        </div>
        <div class="pic-2"></div>
      </div>
    </div>

    <div class="img-2"></div>
    <div class="box-2">
      <div class="section" :class="{ visible: isPanelVisible }">
        <div class="section-2">
          <span class="text-3">{{ activeText }}</span>
        </div>
        <img v-if="activeImage" class="content-img" :src="activeImage" />
        <div
          class="box-3"
          v-for="(btn, i) in midButtons"
          :key="i"
          :style="{ top: btn.top }"
          @click="showContent(i)"
        >
          <span class="text-4">{{ btn.label }}</span>
        </div>
      </div>
      <div class="pic-3">
        <div
          v-for="(dot, i) in dots"
          :key="i"
          class="map-dot"
          :style="{ top: dot.top, left: dot.left, background: dot.color }"
          @click="dot.navigateToUz ? goUzbekistan() : togglePanel()"
          @mouseenter="hoverIndex = i"
          @mouseleave="hoverIndex = null"
        ></div>
        <div
          v-if="hoverIndex !== null"
          class="tooltip tooltip--right"
          :style="{ top: dots[hoverIndex].tooltipTop, left: dots[hoverIndex].tooltipLeft }"
        >
          {{ dots[hoverIndex].text }}
        </div>
      </div>
    </div>

    <div class="section-4">
      <div class="section-tip">
        <span class="tip-text">下滑查看更多国家概况</span>
      </div>
      <div class="group">
        <div v-for="(b, i) in bottomButtons" :key="i" :class="b.class" @click="showBottom(b)">
          <span class="text-7">{{ b.label }}</span>
          <div class="pic-5"></div>
        </div>
        <div class="rectangle">
          <div class="pic-b">
            <span class="text-c">{{ bottomText }}</span>
            <div class="img-6"></div>
          </div>
          <div class="section-7">
            <button class="detail-button" @click="$router.push({ name: 'Home' })">返回首页</button>
            <div class="pic-c"></div>
          </div>
        </div>
      </div>
      <div class="section-8">
        <span class="text-e">组员信息组员信息组员信息组员信息……</span>
      </div>
    </div>

    <div v-if="userPopupVisible" class="user-popup">
      <div>用户名</div>
      <div>邮箱</div>
      <div>个人收藏</div>
      <div>退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Uzbekistan",
  data() {
    return {
      hoverIndex: null,
      userPopupVisible: false,
      isPanelVisible: false,
      activeText: "点击按钮查看更多～",
      activeImage: "",
      bottomText: "乌兹别克斯坦，这颗镶嵌在中亚腹地的明珠……",
      midButtons: [
        { label: "历史背景", top: "50px" },
        { label: "主要遗迹", top: "170px" },
        { label: "文化遗产", top: "290px" },
        { label: "联合考古", top: "410px" },
      ],
      dots: [
        { top: "180px", left: "150px", text: "费尔干纳峡谷的沙漠城堡群", color: "#4686ff" },
        { top: "360px", left: "290px", text: "伊钱卡拉古城", color: "#4686ff" },
        { top: "375px", left: "300px", text: "希瓦", color: "#4686ff" },
        { top: "485px", left: "440px", text: "泽拉夫尚-卡拉库姆廊道", color: "#4686ff" },
        { top: "380px", left: "680px", text: "首都：塔什干", color: "#ffd700", navigateToUz: true },
      ],
      bottomButtons: [
        { class: "geography", label: "地理" },
        { class: "history", label: "历史" },
        { class: "building", label: "建筑" },
        { class: "clothing", label: "服饰" },
        { class: "religion", label: "宗教" },
      ],
    };
  },
  methods: {
    toggleUserPopup() {
      this.userPopupVisible = !this.userPopupVisible;
    },
    togglePanel() {
      this.isPanelVisible = !this.isPanelVisible;
    },
    showContent(i) {
      const contentMap = [
        "希瓦古城位于乌兹别克斯坦西南部的花剌子模州，始建于公元10世纪……",
        "阿米尔·图拉经学院建于18世纪，是希瓦汗国时期的伊斯兰学术中心……",
        "非物质遗产：木雕门窗……",
        "2014年，为了恢复阿米尔·图拉经学院和哈桑清真寺的原貌……",
      ];
      this.activeText = contentMap[i];
      this.isPanelVisible = true;
    },
    showBottom(b) {
      const bottomMap = {
        geography: "乌兹别克斯坦，这颗镶嵌在中亚腹地的明珠……",
        history: "粟特人曾在绿洲建城……",
        building: "在这片被沙漠与绿洲亲吻的土地上……",
        clothing: "在乌兹别克斯坦，服饰不仅是遮体御寒之物……",
        religion: "在这片被沙漠与绿洲分割的土地上，宗教如同锡尔河的水流……",
      };
      this.bottomText = bottomMap[b.class];
    },
    goUzbekistan() {
      this.$router.push({ name: "Uzbekistan" });
    },
  },
  mounted() {
    const s = document.createElement('script');
    s.src = '/legacy/uzbekistan.dom.js';
    s.async = false;
    document.body.appendChild(s);
  }
};
</script>

<style scoped>
.user-popup {
  position: absolute;
  top: 100px;
  right: 120px;
  width: 180px;
  background: #fff;
  box-shadow: 0 0 12px rgba(0,0,0,0.2);
  padding: 12px;
  border-radius: 8px;
  z-index: 100;
}
.map-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  box-shadow: 0px 0px 6px rgba(0,0,0,0.3);
  cursor: pointer;
  transition: transform 0.3s ease;
}
.map-dot:hover { transform: scale(1.4); }
.tooltip {
  position: absolute;
  background: #fff;
  color: #000;
  border-radius: 8px;
  padding: 8px 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.15);
  max-width: 200px;
  font-size: 14px;
  line-height: 1.4;
}
.tooltip--right {
  transform: translate(20px, -10px);
}
</style>