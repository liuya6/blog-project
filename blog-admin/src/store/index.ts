import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };

export * from './modules/app';
export * from './modules/content';
export * from './modules/system';
export * from './modules/trade';
