import { createRouter, createWebHistory } from 'vue-router';
import Desktop from '../screens/Desktop.vue';
import Uzbekistan from '../screens/Uzbekistan.vue';

const routes = [
  { path: '/', name: 'Home', component: Desktop },
  { path: '/uzbekistan', name: 'Uzbekistan', component: Uzbekistan },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;