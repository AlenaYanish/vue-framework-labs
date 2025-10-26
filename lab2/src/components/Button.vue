<script setup>
import { computed } from 'vue'

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'blue'
    },
    size: {
        type: String,
        default: 'md'
    },
    icon: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['click'])

const colorClasses = computed(() => {
    const colors = {
        blue: 'bg-blue-500 hover:bg-blue-600 text-white',
        red: 'bg-red-500 hover:bg-red-600 text-white',
        green: 'bg-green-500 hover:bg-green-600 text-white',
        gray: 'bg-gray-500 hover:bg-gray-600 text-white'
    }
    return colors[props.color] || colors.blue
})

const sizeClasses = computed(() => {
    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg'
    }
    return sizes[props.size] || sizes.md
})
</script>

<template>
    <button
        @click="emit('click')"
        class="flex items-center justify-center gap-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
        :class="[colorClasses, sizeClasses]"
    >
    <span v-if="icon" class="material-icons">{{ icon }}</span>
    {{ label }}
    </button>
</template>

<style scoped>
.material-icons {
    font-size: 1.2em;
}
</style>
