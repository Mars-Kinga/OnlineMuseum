import { createRouter, createWebHistory } from 'vue-router';
import Desktop from '../screens/Desktop.vue';
import Uzbekistan from '../screens/Uzbekistan.vue';
import Kazakhstan from '../screens/Kazakhstan.vue';

const routes = [
  { path: '/', name: 'Home', component: Desktop },
  { path: '/uzbekistan', name: 'Uzbekistan', component: Uzbekistan },
  { path: '/kazakhstan', name: 'Kazakhstan', component: Kazakhstan },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;