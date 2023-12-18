import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

require('events').EventEmitter.defaultMaxListeners = 0; 

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    outDir:'D:/Users/xiaojiawang/Desktop/myself/笔记/IntronSiyuan/data/widgets/SimplePlanDevlop'
  }

})


