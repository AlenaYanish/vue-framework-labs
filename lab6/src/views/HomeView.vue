<script setup lang="ts">

import { onMounted, ref } from "vue";
import type { Category } from "@/types";
import { serviceProvider } from "@/services/"; 
import CategoryWrapper from "@/components/category/CategoryWrapper.vue";
import ProductsView from "@/views/ProductsView.vue";

const categories = ref<Category[]>([]);
const loading = ref<boolean>(false);

const fetchCategories = async () => {
    try {
        loading.value = true;
        categories.value = await serviceProvider.categoryService.getAll();
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchCategories();
})
</script>

<template>
    <main class="container mx-auto">
        <h1 class="text-center font-semibold p-8"> My Shop Products Categories </h1>
        <section>
            <CategoryWrapper :items ="categories" :loading="loading" />
        </section>
        <section>
            <ProductsView />
        </section>
    </main>
</template>
