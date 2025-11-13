<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { serviceProvider } from '@/services';
import type { ProductModel } from '@/models/product.model';

const props = defineProps<{
  id: string;
}>();

const product = ref<ProductModel | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
/**
 * Завантажує деталі товару за ID.
 * @param productId ID товару для завантаження
 */
const fetchProduct = async (productId: number) => {
  isLoading.value = true;
  error.value = null;
  product.value = null;

  if (!productId) {
    error.value = 'Недійсний ID товару.';
    isLoading.value = false;
    return;
  }

  try {
    const fetchedProduct = await serviceProvider.productService.getById(productId);
    product.value = fetchedProduct;
  } catch (err: any) {
    console.error('Помилка завантаження деталей товару:', err);
    if (err.response && err.response.status === 404) {
      error.value = 'Товар не знайдено.';
    } else {
      error.value = 'Не вдалося завантажити деталі товару. Спробуйте пізніше.';
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => fetchProduct(Number(props.id)));

watch(() => props.id, (newId) => {
  fetchProduct(Number(newId));
});
</script>

<template>
  <div class="product-details-container p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg mt-8">
    <button 
      @click="$router.push({ name: 'products' })"
      class="text-indigo-600 hover:text-indigo-800 transition duration-150 mb-6 flex items-center"
    >
      &larr; Повернутися до списку
    </button>
    
    <h1 class="text-4xl font-extrabold mb-4 text-gray-800 border-b pb-2">Деталі Товару</h1>
    <div v-if="isLoading" class="text-center p-16">
      <div class="animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
        <div class="h-40 bg-gray-200 rounded w-full"></div>
      </div>
      <p class="mt-4 text-indigo-600">Завантаження деталей...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-8 rounded relative text-center">
      <strong class="font-bold">Помилка!</strong>
      <p class="block mt-2">{{ error }}</p>
    </div>
    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div class="space-y-4">
        <img 
          :src="product.images[0] || 'https://placehold.co/800x600/e0e0e0/555555?text=Product+Image'" 
          alt="Головне зображення товару" 
          class="w-full h-auto rounded-lg shadow-md object-cover max-h-96"
          onerror="this.onerror=null; this.src='https://placehold.co/800x600/e0e0e0/555555?text=Image+Error';"
        />
      </div>
    
      <div class="details-info">
        <p class="text-sm text-indigo-600 font-medium mb-2 uppercase tracking-wider">
          {{ product.category?.name || 'Категорія невідома' }}
        </p>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ product.title }}</h2>
        
        <p class="text-4xl font-extrabold text-green-600 mb-6">
          ${{ product.price.toFixed(2) }}
        </p>
        
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2 text-gray-700">Опис</h3>
          <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ product.description }}</p>
        </div>
        
        <div class="space-y-2 text-sm text-gray-500">
          <p>Створено: {{ new Date(product.creationAt).toLocaleDateString() }}</p>
          <p>Оновлено: {{ new Date(product.updatedAt).toLocaleDateString() }}</p>
        </div>
        
        <button
          class="mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition duration-200 transform hover:scale-[1.01]"
        >
          Додати до кошика
        </button>
      </div>
    </div>

    <div v-else class="text-center p-16 text-gray-500">
        <p>Немає даних для відображення.</p>
    </div>
  </div>
</template>

<style scoped>

.whitespace-pre-line {
    white-space: pre-line;
}
</style>
