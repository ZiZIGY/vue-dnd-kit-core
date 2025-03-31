import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      beforeWriteFile: (filePath, content) => {
        const fixedContent = content.replace(
          /from ['"]\.\.\/types['"];/g,
          'from "../types";'
        );
        return {
          filePath: filePath.replace('/src/', '/'),
          content: fixedContent,
        };
      },
      copyDtsFiles: true,
      insertTypesEntry: true,
      cleanVueFileName: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueDndKitCore',
      formats: ['es', 'cjs'],
      fileName: (format) => `vue-dnd-kit-core.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
    cssCodeSplit: false,
    cssMinify: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
