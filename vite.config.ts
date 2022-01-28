/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      resolve: {
        alias: {
          '~/': `${path.resolve(__dirname, 'src')}/`,
        },
      },
      plugins: [
        Vue(),

        AutoImport({
          imports: [
            'vue',
            'vue-router',
            '@vueuse/core',
            'vitest',
          ],
          dts: true,
        }),

        Components({
          dts: true,
        }),
      ],

      test: {
        include: ['test/**/*.test.ts'],
        environment: 'jsdom',
      },
    }
  }
  else {
    return {
      resolve: {
        alias: {
          '~/': `${path.resolve(__dirname, 'src')}/`,
        },
      },
      base: path.resolve(__dirname, './dist/'),
      plugins: [
        Vue(),

        AutoImport({
          imports: [
            'vue',
            'vue-router',
            '@vueuse/core',
            'vitest',
          ],
          dts: true,
        }),

        Components({
          dts: true,
        }),
      ],

      optimizeDeps: {
        include: [
          'vue',
          '@vueuse/core',
        ],
      },
    }
  }
})
