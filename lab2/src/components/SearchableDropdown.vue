<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  modelValue: { type: [String, Array, Number, Object], default: () => '' },
  multiple: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Пошук...' },
  itemLabel: { type: String, default: 'label' },
  itemValue: { type: String, default: 'value' },
})

const emit = defineEmits(['update:modelValue', 'select'])

const root = ref(null)
const input = ref(null)
const isOpen = ref(false)
const searchText = ref('')
const highlightedIndex = ref(-1)

const selected = ref(props.multiple ? (Array.isArray(props.modelValue) ? [...props.modelValue] : []) : props.modelValue ?? '')

watch(selected, (val) => emit('update:modelValue', val))
watch(() => props.modelValue, (val) => {
  selected.value = props.multiple ? (Array.isArray(val) ? [...val] : []) : val ?? ''
})

function getLabel(item) {
  return (item && typeof item === 'object') ? (item[props.itemLabel] ?? String(item)) : String(item)
}
function getValue(item) {
  return (item && typeof item === 'object') ? (item[props.itemValue] ?? item) : item
}

const filteredItems = computed(() => {
  if (!searchText.value) return props.items
  const q = searchText.value.toLowerCase()
  return props.items.filter(i => getLabel(i).toLowerCase().includes(q))
})

function selectItem(item) {
  const val = getValue(item)
  if (props.multiple) {
    const arr = Array.isArray(selected.value) ? [...selected.value] : []
    if (!arr.some(x => getValue(x) === val)) {
      arr.push(item)
    } else {
      selected.value = arr.filter(x => getValue(x) !== val)
      return
    }
    selected.value = arr
  } else {
    selected.value = item
    searchText.value = getLabel(item)
    isOpen.value = false
  }
  emit('select', selected.value)
}

function clearSelection() {
  selected.value = props.multiple ? [] : ''
  searchText.value = ''
  isOpen.value = false
  emit('select', selected.value)
}

function open() {
  isOpen.value = true
  highlightedIndex.value = 0
}
function close() {
  isOpen.value = false
  highlightedIndex.value = -1
  if (!props.multiple && selected.value) {
    searchText.value = getLabel(selected.value)
  }
}

function onKeydown(e) {
  if (!isOpen.value && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
    open()
    e.preventDefault()
    return
  }
  if (!isOpen.value) return

  if (e.key === 'ArrowDown') {
    highlightedIndex.value = Math.min(highlightedIndex.value + 1, filteredItems.value.length - 1)
    e.preventDefault()
  } else if (e.key === 'ArrowUp') {
    highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
    e.preventDefault()
  } else if (e.key === 'Enter') {
    if (filteredItems.value[highlightedIndex.value]) {
      selectItem(filteredItems.value[highlightedIndex.value])
    }
    e.preventDefault()
  } else if (e.key === 'Escape') {
    close()
  }
}

function handleClickOutside(e) {
  if (!root.value) return
  if (!root.value.contains(e.target)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="root" class="relative w-72 text-black">
    <div class="flex items-center gap-2">
      <input
        ref="input"
        v-model="searchText"
        @focus="open"
        @keydown="onKeydown"
        :placeholder="placeholder"
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        aria-expanded="isOpen"
        aria-haspopup="listbox"
      />
      <button
        v-if="(Array.isArray(selected) ? selected.length > 0 : !!selected)"
        @click="clearSelection"
        type="button"
        class="px-2 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50"
        title="Очистити вибір"
      >
        Очистити
      </button>
    </div>
    <ul
      v-show="isOpen"
      class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded shadow max-h-48 overflow-y-auto"
      role="listbox"
      tabindex="-1"
    >
      <li
        v-for="(item, index) in filteredItems"
        :key="getValue(item) + '_' + index"
        :class="[
          'px-3 py-2 cursor-pointer flex items-center justify-between',
          index === highlightedIndex ? 'bg-blue-100' : '',
          (Array.isArray(selected) ? selected.some(s => getValue(s) === getValue(item)) : (getValue(selected) === getValue(item))) ? 'bg-blue-200' : ''
        ]"
        @click="() => selectItem(item)"
        @mousemove="highlightedIndex = index"
        role="option"
        :aria-selected="(Array.isArray(selected) ? selected.some(s => getValue(s) === getValue(item)) : (getValue(selected) === getValue(item)))"
      >
        <slot name="item" :item="item">
          <span>{{ getLabel(item) }}</span>
        </slot>
        <svg v-if="Array.isArray(selected) ? selected.some(s => getValue(s) === getValue(item)) : (getValue(selected) === getValue(item))"
            class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </li>
      <li v-if="filteredItems.length === 0" class="px-3 py-2 text-gray-500 italic">
        Нічого не знайдено
      </li>
    </ul>
    <div v-if="Array.isArray(selected) ? selected.length > 0 : !!selected" class="mt-2 flex flex-wrap gap-2">
      <template v-if="Array.isArray(selected)">
        <span v-for="(s, i) in selected" :key="getValue(s) + '_' + i" class="flex items-center gap-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">
          <span class="text-sm">{{ getLabel(s) }}</span>
          <button @click="() => { selected = selected.filter(x => getValue(x) !== getValue(s)) }" class="text-red-500 text-sm">&times;</button>
        </span>
      </template>
      <template v-else>
        <span class="flex items-center gap-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">
          <span class="text-sm">{{ getLabel(selected) }}</span>
          <button @click="clearSelection" class="text-red-500 text-sm">&times;</button>
        </span>
      </template>
    </div>
  </div>
</template>

