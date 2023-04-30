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

    <div style="display: flex;justify-content: center">
      <div id="tmq-box" class="tmq-box">
        <div v-for="item in chatLogs" class="tmq-chat">
          <common
              :author="item.author"
              :avatar="item.avatar"
              :content="item.content">
          </common>
        </div>
      </div>
    </div>


    <div  class="tmq-input-div" >
      <el-input :disabled="loading"  class="tmq-input" placeholder="请输入内容" v-model="userText">
        <template slot="append">
          <el-button :disabled="loading" @click="toMessage" type="primary" plain icon="el-icon-s-promotion"></el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script>
import {
  SearchIcon, MailIcon, UserIcon, EllipsisIcon,
} from 'tdesign-icons-vue';
import {toMessage} from "@/api/gpt.api";
import Common from "@/components/common.vue";
export default {
  name: "gpt35",
  components: {
    Common,
    SearchIcon,
    MailIcon,
    UserIcon,
    EllipsisIcon,
  },
  data(){
    return{
      loading:false,
      menu2Value:'item1',
      userText:'',
      chatLogs:[
        {
          avatar:'https://upload.wikimedia.org/wikipedia/zh/c/ce/HNU_Logo_in_2007.png',
          author:'GPT🤖',
          content:'你好，我是NB-GPT'
        }
      ],
      chat_id:new Date().getTime().toString()
    }
  },
  mounted() {

  },
  methods:{

    scrollBox(){
      let doc = document.getElementById('tmq-box')
      doc.scrollTop = doc.scrollHeight;
    },

    async toMessage(){
      let params={
        user_text:this.userText,
        chat_id:this.chat_id
      }
      let userChat={
        avatar:'https://i.328888.xyz/2023/04/25/ioYGcb.jpeg',
        author:'YOU',
        content:this.userText
      }
      this.chatLogs.push(userChat)
      this.scrollBox()
      this.loading=true
      let res=await toMessage(params)
      this.loading=false
      if(res.status===200){
        let gptChat={
          avatar:'https://upload.wikimedia.org/wikipedia/zh/c/ce/HNU_Logo_in_2007.png',
          author:'GPT🤖',
          content:res.data
        }
        this.chatLogs.push(gptChat)
        this.scrollBox()
        this.userText=''
      }
    }
  }
}
</script>

<style scoped>
.tmq-chat{
  padding: 12px;
}
.tmq-box{
  width: 700px;
  height: 800px;
  margin-top: 12px;
  /*background-color: #c7c7c7;*/
  overflow-y: scroll;
}
.tmq-input-div{
  display: flex;
  justify-content: center;
}
.tmq-input{
  width: 700px;
  position: absolute;
  bottom: 45px;
}
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
