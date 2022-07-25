import { createApp } from 'vue';
import App from '@/App.vue';
import './styles/main.scss';
import router from './router/routes';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
const pinia = createPinia();

createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app');
