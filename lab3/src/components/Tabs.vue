<script setup lang="ts">
import { ref, watch, provide, useSlots, computed } from 'vue';
import { TabsInjectionKey, type TabsContext } from '../keys/tabs-key';

const props = defineProps<{
  modelValue: string;
  variant: 'underline' | 'pills' | 'boxed';
}>();

const emit = defineEmits(['update:modelValue']);

const activeSlug = ref(props.modelValue);

watch(() => props.modelValue, (newSlug) => {
  activeSlug.value = newSlug;
});

const setActiveTab = (slug: string) => {
  activeSlug.value = slug;
  emit('update:modelValue', slug);
};

const context: TabsContext = {
  activeSlug: computed(() => activeSlug.value),
  setActiveTab,
  variant: props.variant
};

provide(TabsInjectionKey, context);

const slots = useSlots();

const tabSlugs = computed(() => {
    if (!slots.default) return [];
    const tabs = slots.default()
    .filter(vnode => vnode.type && (vnode.type as any).__name === 'Tab')
    .map(vnode => ({
        title: (vnode.props?.title as string) || 'Без назви',
        slug: (vnode.props?.slug as string) || ''
    }));
    if (tabs.length > 0 && !activeSlug.value) {
        activeSlug.value = tabs[0].slug;
    }
    return tabs;
});

const navClasses = computed(() => {
    if (props.variant === 'pills') {
        return 'flex space-x-2 p-1 bg-gray-100 rounded-lg';
    }
    if (props.variant === 'boxed') {
        return 'flex border rounded-t-lg bg-gray-50';
    }
    return 'flex border-b border-gray-200';
});

const getTabHeaderClasses = (slug: string) => {
    const isActive = slug === activeSlug.value;
    const baseClasses = [
        'px-4',
        'py-2',
        'font-medium',
        'text-sm',
        'cursor-pointer',
        'transition-colors',
        'duration-200',
        'select-none'
    ];    
    if (props.variant === 'pills') {
        baseClasses.push(
            isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200', 'rounded-lg'
        );
    } else if (props.variant === 'boxed') {
        baseClasses.push(
            isActive ? 'bg-white text-blue-600 border-t border-l border-r -mb-px' : 'text-gray-600 hover:text-gray-800', 'rounded-t-lg'
        );
    } else { 
        baseClasses.push(
            isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
        );
    }
    return baseClasses.join(' ');
};
</script>

<template>
    <div class="w-full">
        <div :class="navClasses">
            <div
                v-for="tab in tabSlugs"
                :key="tab.slug"
                @click="setActiveTab(tab.slug)"
                :class="getTabHeaderClasses(tab.slug)"
            >
                {{ tab.title }}
            </div>
        </div>
        <div class="mt-4 p-4 border rounded-lg bg-white shadow-sm">
            <slot></slot>
        </div>
    </div>
</template>
