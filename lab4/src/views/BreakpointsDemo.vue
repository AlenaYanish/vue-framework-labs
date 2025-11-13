<script setup lang="ts">

import { useBreakpoints } from '../composables/useBreakpoints'; 

const {
  width,
  isMobile,
  isTablet,
  isDesktop,
  greater,
  smaller,
  between,
} = useBreakpoints({
  mobile: 640,
  tablet: 960,
  desktop: 1280,
});
</script>

<template>
  <div class="p-8 bg-white min-h-screen">
    <h1 class="text-3xl font-bold mb-4">Демонстрація useBreakpoints</h1>
    <div class="border p-4 rounded-lg bg-gray-50 shadow-sm">
      <p class="text-lg font-semibold mb-2">Поточна ширина вікна: <span class="text-blue-600">{{ width }}px</span></p>
      <hr class="my-4" />
      <h2 class="text-xl font-semibold mb-2">Автоматичні перевірки</h2>
      <p :class="{'font-bold text-green-600': isMobile}">Мобільний режим (width < 640px)</p>
      <p :class="{'font-bold text-green-600': isTablet}">Планшетний режим (640px ≤ width < 1280px)</p>
      <p :class="{'font-bold text-green-600': isDesktop}">Десктопний режим (width ≥ 1280px)</p>
      <hr class="my-4" />
      <h2 class="text-xl font-semibold mb-2">Функціональні перевірки</h2>
      <p>greater("tablet") → <span class="font-mono">{{ greater('tablet').value }}</span> ({{ width }}px ≥ 960px)</p>
      <p>smaller("desktop") → <span class="font-mono">{{ smaller('desktop').value }}</span> ({{ width }}px < 1280px)</p>
      <p>between("mobile", "desktop") → <span class="font-mono">{{ between('mobile', 'desktop').value }}</span> (640px ≤ {{ width }}px < 1280px)</p>
    </div>
  </div>
</template>

