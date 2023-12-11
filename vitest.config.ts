import { UserConfig, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig as UserConfig,
  defineConfig({
    test: {
      environment: 'happy-dom',
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'html', 'clover', 'json', 'json-summary'],
      },
    },
  }) as UserConfig
);
