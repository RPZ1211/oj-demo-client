import Vue from 'vue'
import App from './App.vue'
import router from "@/configs/router.config.js";
import ElementUI,{Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/configs/rem.config.js"
import TDesign from 'tdesign-vue';

// 引入组件库的少量全局样式变量
import 'tdesign-vue/es/style/index.css';

Vue.use(TDesign);

Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
