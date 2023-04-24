import Vue from 'vue'
import App from './App.vue'
import router from "@/configs/router.config.js";
import ElementUI,{Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/configs/rem.config.js"
import TDesign from 'tdesign-vue';
// 引入组件库的少量全局样式变量
import 'tdesign-vue/es/style/index.css';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VMdPreview);

Vue.use(TDesign);

Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
