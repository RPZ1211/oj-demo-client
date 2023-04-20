<template>
  <div>
    <t-head-menu theme="dark" v-model="menu2Value" height="120px">
      <img slot="logo" class="tmq-icon" src="https://www.hfnu.edu.cn/images/logo1111.png" alt="logo" />
      <template #operations>
        <div class="t-demo-menu--dark">
          <t-button variant="text" shape="square">
            <search-icon slot="icon" />
          </t-button>
          <t-button variant="text" shape="square">
            <mail-icon slot="icon" />
          </t-button>
          <t-button variant="text" shape="square">
            <user-icon slot="icon" />
          </t-button>
          <t-button variant="text" shape="square">
            <ellipsis-icon slot="icon" />
          </t-button>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>

<script>
import {
  SearchIcon, MailIcon, UserIcon, EllipsisIcon,
} from 'tdesign-icons-vue';
export default {
  name: "tmq",
  components: {
    SearchIcon,
    MailIcon,
    UserIcon,
    EllipsisIcon,
  },
  data(){
    return{
      menu2Value:'item1'
    }
  },
  mounted() {
    // document.documentElement.setAttribute('theme-mode', 'dark');
  }
}
</script>

<style scoped>
.tmq-icon{
  height: 37px;
}
.t-menu__operations .t-button {
  margin-left: 8px;
}
.t-demo-menu--dark .t-button {
  color: #fff;
}
.t-demo-menu--dark .t-button:hover {
  background-color: #4b4b4b;
  border-color: transparent;
  --ripple-color: #383838;
}
</style>