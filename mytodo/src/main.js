
import { createApp } from 'vue'
import App from './App.vue'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueRouter from './router/router.js'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';


const app = createApp(App)

app.use(ElementUI).use(VueRouter)

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(Antd)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}




app.mount('#app')

