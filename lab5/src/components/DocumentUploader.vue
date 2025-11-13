<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import type { PropType } from 'vue';

interface Document {
  type: string;
  icon: string;
  name: string;
}

const props = defineProps({
  modelValue: {
    type: Array as PropType<File[]>,
    default: () => [],
    required: true,
  },
  documents: {
    type: Array as PropType<Document[]>,
    default: () => [],
  },
  maxFiles: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:modelValue']);
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const totalDocumentsCount = computed(() => {
  return props.modelValue.length + props.documents.length;
});

const currentFilesCount = computed(() => props.modelValue.length);

const isMaxFilesReached = computed(() => 
  props.maxFiles > 0 && currentFilesCount.value >= props.maxFiles
);

const allDocuments = computed(() => [
  ...props.documents,
  ...props.modelValue
]);

const openFilePicker = () => {
  if (!isMaxFilesReached.value) {
    fileInput.value?.click();
  }
};

const processFiles = (files: FileList | File[]) => {
  if (isMaxFilesReached.value) return;

  const filesArray = Array.from(files);
  const newFiles: File[] = [];

  let remainingSlots = props.maxFiles > 0 
    ? props.maxFiles - currentFilesCount.value 
    : filesArray.length;

  for (const file of filesArray) {
    if (remainingSlots <= 0 && props.maxFiles > 0) break;

    const isDuplicate = props.modelValue.some(
      existingFile => existingFile.name === file.name && existingFile.size === file.size
    );

    if (!isDuplicate) {
      newFiles.push(file);
      remainingSlots--;
    }
  }

  if (newFiles.length > 0) {
    const updatedFiles = [...props.modelValue, ...newFiles];
    emit('update:modelValue', updatedFiles);
  }
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files) {
    processFiles(event.dataTransfer.files);
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    processFiles(target.files);
    target.value = ''; 
  }
};

const removeDocument = (index: number, type: 'file' | 'prop') => {
  if (type === 'file') {
    const updatedFiles = props.modelValue.filter((_, i) => i !== index);
    emit('update:modelValue', updatedFiles);
  } else if (type === 'prop') {
    console.warn(`[DocumentUploader] Документ з пропса documents (Індекс: ${index}) не може бути видалений всередині компонента. Ця логіка має бути реалізована у батьківському компоненті через додаткову подію.`);
  }
};

const isImage = (file: File): boolean => {
  return file.type.startsWith('image/');
};

const createPreviewURL = (file: File): string => {
  try {
    return URL.createObjectURL(file);
  } catch (error) {
    console.error("Помилка створення об'єктного URL:", error);
    return '';
  }
};

const formatFileSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const getFileExtension = (file: File): string => {
  return file.name.split('.').pop() || '';
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.onerror = null;
  target.src = 'https://placehold.co/32x32/cccccc/333333?text=DOC';
};

onUnmounted(() => {
  props.modelValue.forEach(file => {
    URL.revokeObjectURL(createPreviewURL(file));
  });
});

</script>

<template>
  <div class="document-uploader p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">Завантаження документів</h2>

    <div
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="openFilePicker"
      :class="[
        'upload-area flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-all cursor-pointer',
        isDragging ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
      ]"
    >
      <input type="file" ref="fileInput" @change="handleFileChange" multiple class="hidden" />
      <svg class="w-10 h-10 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 015 5v7a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
      </svg>
      <p class="text-sm font-medium text-gray-600">Перетягніть файли сюди або <span class="text-indigo-600 font-bold">натисніть для вибору</span></p>
      <p v-if="maxFiles > 0" class="text-xs text-gray-400 mt-1">Максимум: {{ maxFiles }} файлів</p>
    </div>
    <p v-if="isMaxFilesReached" class="mt-3 text-sm font-medium text-red-500">
      Досягнуто максимальної кількості файлів ({{ maxFiles }}). Будь ласка, видаліть файли перед додаванням нових.
    </p>
    <div v-if="allDocuments.length > 0" class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="(doc, index) in props.documents" 
        :key="'doc-' + index" 
        class="flex items-center p-3 border border-gray-100 rounded-lg bg-gray-50 shadow-sm"
      >
        <img :src="doc.icon" :alt="doc.type" class="w-8 h-8 mr-3 object-contain" @error="handleImageError" />
        <div class="flex-grow min-w-0">
          <p class="text-sm font-medium text-gray-800 truncate" :title="doc.name">{{ doc.name }}</p>
          <p class="text-xs text-gray-400 uppercase">{{ doc.type }} (Готовий)</p>
        </div>
        <button 
          @click.stop="removeDocument(index, 'prop')" 
          type="button" 
          class="ml-3 p-1 rounded-full text-red-500 hover:bg-red-100 transition duration-150"
          title="Видалити документ"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div 
        v-for="(file, index) in props.modelValue" 
        :key="'file-' + index" 
        class="flex items-center p-3 border border-gray-100 rounded-lg bg-indigo-50 shadow-sm"
      >
        <div class="flex-shrink-0 w-8 h-8 mr-3 rounded overflow-hidden">
          <img 
            v-if="isImage(file)" 
            :src="createPreviewURL(file)" 
            alt="Прев'ю зображення" 
            class="w-full h-full object-cover" 
          />
          <div v-else class="w-full h-full flex items-center justify-center bg-indigo-200 text-indigo-800 text-xs font-bold">
            {{ getFileExtension(file).toUpperCase() }}
          </div>
        </div>

        <div class="flex-grow min-w-0">
          <p class="text-sm font-medium text-gray-800 truncate" :title="file.name">{{ file.name }}</p>
          <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
        </div>

        <button 
          @click.stop="removeDocument(index, 'file')" 
          type="button" 
          class="ml-3 p-1 rounded-full text-red-500 hover:bg-red-100 transition duration-150"
          title="Видалити файл"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

    </div>
    
    <div v-if="allDocuments.length === 0" class="text-center mt-4 text-gray-500">
      <p>Список документів порожній.</p>
    </div>
  </div>
</template>



<style scoped>
.upload-area {
  min-height: 150px;
}
</style>
