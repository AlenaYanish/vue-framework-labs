<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { serviceProvider } from '@/services';
import type { Product } from '@/models/product.model';
import router from '@/router';

const products = ref<Product[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const fetchProducts = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    products.value = await serviceProvider.productService.getAll();
  } catch (err) {
    console.error('Помилка завантаження товарів:', err);
    error.value = 'Не вдалося завантажити список товарів. Перевірте з\'єднання з API.';
  } finally {
    isLoading.value = false;
  }
};
/**
 * Перехід до сторінки деталей товару
 * @param id ID вибраного товару
 */
const goToDetails = (id: number) => {
  router.push({ name: 'product-details', params: { id: id.toString() } });
};

onMounted(fetchProducts);
</script>

<template>
  <div class="products-container p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">Список Товарів</h1>

    <div v-if="isLoading" class="text-center p-10">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 inline-block"></div>
      <p class="mt-4 text-indigo-600">Завантаження даних...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Помилка!</strong>
      <span class="block sm:inline"> {{ error }}</span>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:shadow-xl hover:scale-[1.02]"
        @click="goToDetails(product.id)"
      >
        <div class="h-48 overflow-hidden">
          <img 
            :src="product.images[0] || 'https://placehold.co/400x300/e0e0e0/555555?text=No+Image'" 
            alt="Зображення товару" 
            class="w-full h-full object-cover"
          />
        </div>
        
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-900 truncate mb-1">
            {{ product.title }}
          </h2>
          
          <p class="text-sm text-indigo-600 mb-2">
            {{ product.category?.name || 'Без категорії' }}
          </p>
          
          <p class="text-2xl font-bold text-gray-800">
            ${{ product.price.toFixed(2) }}
          </p>
        </div>
      </div>
      
      <div v-if="products.length === 0" class="col-span-full text-center py-10 text-gray-500">
        <p>Список товарів порожній.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  transition: all 0.3s ease;
}
</style>
