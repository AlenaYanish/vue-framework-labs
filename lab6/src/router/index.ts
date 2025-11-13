import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import CategoryCard from '@/components/category/CategoryCard.vue';
import CategoryWrapper from '@/components/category/CategoryWrapper.vue';

const ProductsView = () => import('@/views/ProductsView.vue');
const ProductDetailsView = () => import('@/views/ProductDetailsView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/categories/',
      name: 'categories',
      component: CategoryWrapper,
      meta: { title: 'Список категорій' },
    },
    {
      path: '/categories/:id',
      name: 'category-details',
      component: CategoryCard,
      props: true,
      meta: { title: 'Деталі категорії' },
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
      meta: { title: 'Список товарів' },
    },
    {
      path: '/products/:id(\\d+)',
      name: 'product-details',
      component: ProductDetailsView,
      props: true,
      meta: { title: 'Деталі товарів' },
    },
  ],
});

export default router;
