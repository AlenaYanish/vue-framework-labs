<script setup lang="ts">
import { ref } from 'vue';
import Tabs from '../components/Tabs.vue';
import Tab from '../components/Tab.vue';

// const current = ref('profile')
const currentUnderline = ref('profile');
const currentPills = ref('products');
const currentBoxed = ref('reports');
</script>
<!-- <template>
  <Tabs v-model="current" variant="underline">
    <Tab title="Профіль" slug="profile">Вміст профілю...</Tab>
    <Tab title="Налаштування" slug="settings">Форма налаштувань...</Tab>
    <Tab title="Контакти" slug="contacts">Контактна інформація...</Tab>
  </Tabs>
</template> -->

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-8">Лабораторна №3: Tabs (Slots & Provide/Inject)</h1>
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">Варіант: Underline (v-model: {{ currentUnderline }})</h2>
      <Tabs v-model="currentUnderline" variant="underline">
        <Tab title="Профіль" slug="profile">
          <p>Ваш email: user@example.com. Оновлення профілю.</p>
        </Tab>
        <Tab title="Налаштування" slug="settings">
          <p>Тут ви можете змінити свої параметри конфіденційності.</p>
        </Tab>
        <Tab title="Контакти" slug="contacts">
          <p>Телефон підтримки: +380 12 345 6789.</p>
        </Tab>
      </Tabs>
    </section>
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">Варіант: Pills (v-model: {{ currentPills }})</h2>
      <Tabs v-model="currentPills" variant="pills">
        <Tab title="Головна" slug="home">
          <p>Ласкаво просимо на головну сторінку!</p>
        </Tab>
        <Tab title="Продукти" slug="products">
          <p>Перелік доступних продуктів.</p>
        </Tab>
      </Tabs>
    </section>
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">Варіант: Boxed (v-model: {{ currentBoxed }})</h2>
      <Tabs v-model="currentBoxed" variant="boxed">
        <Tab title="Аналітика" slug="analytics">
          <p>Дані за останній місяць.</p>
        </Tab>
        <Tab title="Звіти" slug="reports">
          <p>Сформовані PDF звіти.</p>
        </Tab>
        <Tab title="Архів" slug="archive">
          <p>Архівні документи.</p>
        </Tab>
      </Tabs>
    </section>
  </div>
</template>
