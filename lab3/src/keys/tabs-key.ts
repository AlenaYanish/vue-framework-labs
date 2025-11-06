import type { InjectionKey } from 'vue';

export interface TabsContext {
  activeSlug: Readonly<import('vue').Ref<string>>;
  setActiveTab: (slug: string) => void;
  variant: 'underline' | 'pills' | 'boxed';
}

export const TabsInjectionKey: InjectionKey<TabsContext> = Symbol('TabsContext');
