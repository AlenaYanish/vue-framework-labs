<script setup lang="ts">
import { inject, computed } from 'vue';
import { TabsInjectionKey } from '../keys/tabs-key'; 

const props = defineProps<{
  title: string;
  slug: string;
}>();

defineOptions({
  __name: 'Tab'
});

const tabsContext = inject(TabsInjectionKey);

if (!tabsContext) {
  throw new Error('Tab component must be used inside a Tabs component.');
}

const isActive = computed(() => {
  return tabsContext.activeSlug.value === props.slug;
});
</script>

<template>
    <div v-if="isActive">
        <slot></slot>
    </div>
</template>
