import { createRouter, createWebHistory } from 'vue-router';
import Desktop from '../screens/Desktop.vue';
import Uzbekistan from '../screens/Uzbekistan.vue';
import Kazakhstan from '../screens/Kazakhstan.vue';
import Kyrgyzstan from "../screens/Kyrgyzstan.vue";
import Turkmenistan from "../screens/Turkmenistan.vue";
import Exhibition3D from "../screens/Exhibition3D.vue";

const routes = [
  { path: "/", name: "Home", component: Desktop },
  { path: "/uzbekistan", name: "Uzbekistan", component: Uzbekistan },
  { path: "/kazakhstan", name: "Kazakhstan", component: Kazakhstan },
  { path: "/kyrgyzstan", name: "Kyrgyzstan", component: Kyrgyzstan },
  { path: "/turkmenistan", name: "Turkmenistan", component: Turkmenistan },
  { path: "/3d-hall", name: "Exhibition3D", component: Exhibition3D },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;