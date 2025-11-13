import type { App } from 'vue';
import DocumentUploader from './components/DocumentUploader.vue';

export function install(app: App) { // функція install для плагіна
  app.component('DocumentUploader', DocumentUploader);
}

export { DocumentUploader };

export default {
  install,
};
