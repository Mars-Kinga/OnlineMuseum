<template>
  <div class="hall-page">
    <div class="hall-bg" aria-hidden="true"></div>

    <header class="museum-nav">
      <div class="nav-left">
        <button class="nav-back-btn" @click="goHome">返回首页</button>
      </div>

      <nav class="nav-links" aria-label="主导航">
        <span class="nav-link is-active">3D展厅</span>
      </nav>
    </header>

    <main class="hall-content">
      <section class="model-stage">
        <div class="top-toolbar">
          <div class="model-switcher" role="group" aria-label="模型切换">
            <button
              class="switch-btn"
              :class="{ 'is-active': currentModel === '/models/model1.glb' }"
              @click="currentModel = '/models/model1.glb'"
            >
              展示模型一
            </button>
            <button
              class="switch-btn"
              :class="{ 'is-active': currentModel === '/models/model2.glb' }"
              @click="currentModel = '/models/model2.glb'"
            >
              展示模型二
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
                <h3 class="intro-card-title">展品1</h3>
                <p class="intro-card-text">展品1简介</p>
              </article>
              <article class="intro-card" v-else>
                <h3 class="intro-card-title">展品2</h3>
                <p class="intro-card-text">展品2简介</p>
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
const router = useRouter();

const goHome = () => {
  router.push({ name: "Home" });
};
</script>