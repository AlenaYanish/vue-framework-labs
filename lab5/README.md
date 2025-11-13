#Vue Document Uploader Component (Drag & Drop)

Vue 3 компонент для завантаження файлів з підтримкою Drag & Drop, прев'ю та обмеженням максимальної кількості файлів.

## 📦 Встановлення
```bash
# Встановлення через npm
npm install @om_olena/document-uploader-vue
# Або через yarn
yarn add @om_olena/document-uploader-vue
```

## 🛠️ Використання

Ви можете використовувати компонент глобально як плагін, або імпортувати його локально.

1. Глобальна реєстрація (Як плагін)

У вашому головному файлі main.ts (або main.js):
```ts
import { createApp } from 'vue';
import App from './App.vue';
import DocumentUploaderPlugin from '@om_olena/document-uploader-vue';

const app = createApp(App);

app.use(DocumentUploaderPlugin); 

app.mount('#app');
```

2. Локальний імпорт (Рекомендовано)

У будь-якому Vue-файлі (.vue):
```js
import { DocumentUploader } from '@om_olena/document-uploader-vue';

export default {
  components: {
    DocumentUploader,
  },
}
```

## 📋 Приклад

Використовуйте v-model для двосторонньої прив'язки до масиву об'єктів File.

```ts
<script setup>
import { ref } from 'vue';

const uploadedFiles = ref([]);
const existingDocuments = ref([
  { name: 'Старий звіт.pdf', type: 'PDF', icon: '' }
]);

</script>
```
```html
<template>
  <DocumentUploader 
    v-model="uploadedFiles"
    :max-files="5"
    :documents="existingDocuments"
  />
</template>
```

## ⚙️ Пропси (Props)

v-model (тип File[]) - Масив завантажених файлів (File API). Використовуйте для отримання даних.

documents (тип Document[]) - Масив заздалегідь підготовлених документів для відображення (наприклад, вже завантажених на сервер).

maxFiles (тип number) - Максимальна кількість файлів, які можна завантажити (0 – без обмежень). Обмеження стосується лише v-model.


Інтерфейс Document
```ts
interface Document {
  type: string;
  icon: string; 
  name: string;
}
```

## 📧 Події (Emits)

update:modelValue - Оновлення масиву файлів. Викликається при додаванні або видаленні файлу.

