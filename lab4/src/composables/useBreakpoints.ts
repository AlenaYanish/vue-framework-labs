import { ref, computed, ComputedRef, onMounted, toValue } from 'vue';
import { useEventListener } from './useEventListener';

const DEFAULT_BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
};

export interface Breakpoints {
  [key: string]: number;
}

export function useBreakpoints(customBreakpoints?: Breakpoints) {
  const width = ref(0);

  const breakpoints = computed(() => ({
    ...DEFAULT_BREAKPOINTS,
    ...(customBreakpoints || {})
  })) as ComputedRef<Record<string, number>>;

  const updateWidth = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    updateWidth();
  });

  useEventListener(window, 'resize', updateWidth);

  const isMobile = computed(() => width.value < breakpoints.value.mobile);
  const isTablet = computed(() => width.value >= breakpoints.value.mobile && width.value < breakpoints.value.desktop);
  const isDesktop = computed(() => width.value >= breakpoints.value.desktop);
  
  const greater = (name: keyof Breakpoints) => computed(() => {
    const minWidth = toValue(breakpoints.value[name]);
    return width.value >= minWidth;
  });

  const smaller = (name: keyof Breakpoints) => computed(() => {
    const maxWidth = toValue(breakpoints.value[name]);
    return width.value < maxWidth;
  });

  const between = (min: keyof Breakpoints, max: keyof Breakpoints) => computed(() => {
    const minWidth = toValue(breakpoints.value[min]);
    const maxWidth = toValue(breakpoints.value[max]);
    return width.value >= minWidth && width.value < maxWidth;
  });

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
    greater,
    smaller,
    between,
  };
}
