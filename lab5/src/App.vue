<script setup lang="ts">
import { ref, watch } from 'vue';
import DocumentUploader from './components/DocumentUploader.vue'; 

const uploadedFiles = ref<File[]>([]);

const availableDocuments = ref([
  { type: 'pdf', icon: 'https://placehold.co/32x32/ff0000/ffffff?text=PDF', name: 'Contract.pdf' },
  { type: 'docx', icon: 'https://placehold.co/32x32/0078d4/ffffff?text=DOCX', name: 'Report.docx' },
  { type: 'xlsx', icon: 'https://placehold.co/32x32/107c41/ffffff?text=XLSX', name: 'Data.xlsx' },
]);

watch(uploadedFiles, (newVal) => {
  console.log('Список файлів оновлено:', newVal.length, 'файлів');
});

</script>

<template>
  <div id="app" class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-extrabold mb-8 text-center text-gray-900">
      Компонент завантаження файлів DocumentUploader
    </h1>
    
    <div class="max-w-4xl mx-auto">
      <DocumentUploader
        v-model="uploadedFiles"
        :documents="availableDocuments"
        :maxFiles="3"
      />
      <div class="mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
        <!-- <h2 class="text-xl font-semibold mb-3">Стан (uploadedFiles.value)</h2>
        <pre class="bg-gray-800 text-green-400 p-3 rounded-md overflow-x-auto text-sm">
          {{ uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })) }}
        </pre> -->
        <p class="mt-3 font-medium text-gray-700">Всього завантажених файлів: {{ uploadedFiles.length }}</p>
      </div>
    </div>
  </div>
</template>
