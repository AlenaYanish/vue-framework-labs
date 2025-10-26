<script setup>
import { ref } from 'vue'
import Button from './components/Button.vue'
import SearchableDropdown from './components/SearchableDropdown.vue'

const countries = [
  { label: 'Україна', value: 'ua' },
  { label: 'Франція', value: 'fr' },
  { label: 'Німеччина', value: 'de' },
  { label: 'Італія', value: 'it' },
  { label: 'Іспанія', value: 'es' }
]

const frameworks = ['Vue', 'React', 'Angular', 'Svelte']

const selectedSingle = ref('')
const selectedMultiple = ref([])

function sayHi() {
  alert('Кнопка натиснута!')
}
</script>

<template>
  <div class="flex flex-col items-center gap-4 mt-10">
    <h1 class="text-2xl font-bold">Компонент Button</h1>
    <div class="flex items-start gap-4">
      <Button label="Primary" color="blue" size="md" class="self-auto" />
      <Button label="Delete" color="red" size="lg" icon="delete" class="self-auto" />
      <Button label="Success" color="green" size="sm" class="self-auto" @click="sayHi" />
    </div>
  </div>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Компонент SearchableDropdown</h1>
    <div>
      <h2 class="font-medium">Одиночний вибір:</h2>
      <SearchableDropdown
        :items="countries"
        v-model="selectedSingle"
        :multiple="false"
        itemLabel="label"
        itemValue="value"
      />
      <p>Вибране: {{ selectedSingle.label }}</p>
    </div>
    <div>
      <h2 class="font-medium">Множинний вибір:</h2>
      <SearchableDropdown
        :items="frameworks"
        v-model="selectedMultiple"
        :multiple="true"
      />
      <p>Вибрані: {{ selectedMultiple.join(', ') }}</p>
    </div>
  </div>
</template>
