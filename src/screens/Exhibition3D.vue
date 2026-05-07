<template>
  <div class="hall-page" @click="handleBlankClick">
    <div class="hall-bg" aria-hidden="true"></div>

    <header class="museum-nav" @click.stop>
      <div class="nav-left">
        <button class="nav-back-btn" @click="goHome">返回首页</button>
      </div>

      <nav class="nav-links" aria-label="主导航">
        <span class="nav-link is-active">3D展厅</span>
      </nav>
    </header>

    <section class="hall-launch-stage" aria-label="展厅主场景" @dblclick.stop="enterHall">
      <model-viewer
        class="hall-stage-viewer"
        src="/models/table.glb"
        alt="3D展厅总览模型"
        camera-controls
        touch-action="pan-y"
        camera-orbit="0deg 75deg 85%"
        field-of-view="18deg"
        shadow-intensity="1"
        exposure="1"
      ></model-viewer>
      <div v-if="!panelVisible" class="hall-stage-tip">
        双击进入展品细节
      </div>
    </section>

    <main class="hall-content" :class="{ 'is-visible': panelVisible }" @click.stop>
      <section class="model-stage">
        <div class="top-toolbar">
          <div class="model-switcher" role="group" aria-label="模型切换">
            <button
              class="switch-btn"
              :class="{ 'is-active': currentModel === '/models/model1.glb' }"
              @click="currentModel = '/models/model1.glb'"
            >
              哈萨克毡房
            </button>
            <button
              class="switch-btn"
              :class="{ 'is-active': currentModel === '/models/model2.glb' }"
              @click="currentModel = '/models/model2.glb'"
            >
              哈萨克草原石人
            </button>
            <button
              class="switch-btn"
              :class="{ 'is-active': currentModel === '/models/model3.glb' }"
              @click="currentModel = '/models/model3.glb'"
            >
              人面陶瓮
            </button>
          </div>
        </div>

        <div class="viewer-hint" aria-label="模型操作提示">
          拖动旋转模型 / 双击聚焦展品
        </div>

        <div class="stage-grid">
          <div class="viewer-wrap">
            <model-viewer
              class="museum-viewer"
              :src="currentModel"
              alt="3D展厅模型"
              camera-controls
              touch-action="pan-y"
              shadow-intensity="1"
              exposure="1"
            ></model-viewer>
          </div>

          <aside class="exhibit-intro" aria-labelledby="exhibit-intro-title">
            <h2 id="exhibit-intro-title" class="intro-title">展品简介</h2>
            <div class="intro-stack">
              <article class="intro-card" v-if="currentModel === '/models/model1.glb'">
                <h3 class="intro-card-title">哈萨克毡房（Yurt / Kazakh Yurt）</h3>
                <p class="intro-card-text">哈萨克毡房（Yurt）是中亚草原游牧民族最具代表性的传统居所，已有数千年历史。它由木质骨架（如圆形屋顶结构“shanyrak”）和多层羊毛毡覆盖而成，既坚固又轻便，能够快速拆装，非常适应游牧生活的迁徙需求。毡房冬暖夏凉，具有良好的保温和通风性能，其圆形结构不仅能抵御草原强风，也象征着宇宙与家庭的和谐统一。在文化层面上，毡房不仅是居住空间，更是哈萨克人社会关系和礼仪秩序的体现——内部有明确的空间分区，不同位置对应不同身份与功能。至今，毡房仍被视为哈萨克民族文化的重要象征，广泛出现在节庆、旅游和国家标志中。</p>
                <img class="intro-card-image" src="/img/model_img1.png" alt="哈萨克毡房图片" />
              </article>
              <article class="intro-card" v-else-if="currentModel === '/models/model2.glb'">
                <h3 class="intro-card-title">哈萨克草原石人（Balbal / Turkic Stone Statues）</h3>
                <p class="intro-card-text">哈萨克草原石人（通常被称为 Balbal）是分布在中亚草原上的古代石雕人像，主要出现在公元6—10世纪的突厥汗国时期。它们通常被立于墓地或祭祀场所附近，用来纪念逝者或象征其生前的功绩，有时也被认为代表被征服的敌人灵魂。石人多呈站立姿态，面部简化但表情庄重，常见双手持杯或武器的形象，这一细节被认为与祭祀或祖先崇拜有关。这些石雕不仅反映了古代草原民族的丧葬观念和宗教信仰，也体现了游牧文化中对英雄与祖先的尊崇，是研究突厥文明和欧亚草原文化的重要实物遗存。</p>
                <img class="intro-card-image" src="/img/model_img2.png" alt="哈萨克草原石人图片" />
              </article>
              <article class="intro-card" v-else>
                <h3 class="intro-card-title">人面陶瓮</h3>
                <p class="intro-card-text">人面陶瓮是源自公元前2千纪（约3000-4000年前）印度河流域文明的独特陶器，常因其呆萌的“表情包”造型走红。它采用红陶材质，在一侧肩部通过捏塑眉毛、鼻子并戳孔代表眼睛和嘴巴，呈现出质朴可爱、有些惊叹或歪头的抽象人面造型，体现了早期文明的陶艺艺术。该文物曾多次在国际展览中亮相，如“抟埴之工—古代东西文明交流中的陶瓷艺术”展，展示了古老的制陶工艺。</p>
                <img class="intro-card-image" src="/img/model_img3.png" alt="展品三图片" />
              </article>
            </div>
          </aside>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import "./Exhibition3D.css";

const currentModel = ref("/models/model1.glb");
const panelVisible = ref(false);
const router = useRouter();

const enterHall = () => {
  panelVisible.value = true;
};

const handleBlankClick = () => {
  if (panelVisible.value) {
    panelVisible.value = false;
  }
};

const goHome = () => {
  router.push({ name: "Home" });
};
</script>