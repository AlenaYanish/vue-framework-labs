import { onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

type Target = Window | Document | Ref<HTMLElement | null>;
/**
 * @param target цільовий елемент (Window, Document, Ref)
 * @param event подія ('resize', 'click')
 * @param callback ф-я, що викликається при події
 */
export function useEventListener(
  target: Target,
  event: string,
  callback: (e: Event) => any
) {
  const getTarget = (t: Target): EventTarget | null => {
    if ('value' in t) {
      return t.value;
    }
    return t as EventTarget;
  };

  onMounted(() => {
    getTarget(target)?.addEventListener(event, callback);
  });

  onUnmounted(() => {
    getTarget(target)?.removeEventListener(event, callback);
  });
}
