import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const src = (p: string) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': src('app'),
      '@pages': src('pages'),
      '@widgets': src('widgets'),
      '@features': src('features'),
      '@entities': src('entities'),
      '@shared': src('shared'),
      // KRDS 글꼴 파일(scss url()에서 씀). krds.min.css 에는 @font-face 가 없어 직접 선언한다.
      '@krds-fonts': fileURLToPath(new URL('./node_modules/krds-uiux/resources/fonts', import.meta.url)),
    },
  },
  // SSR 빌드에서 krds-uiux 의 CSS import 를 node 가 못 읽으므로 번들에 포함한다.
  ssr: { noExternal: ['krds-uiux'] },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
