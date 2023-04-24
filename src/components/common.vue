<template>
  <div style="display: flex">
    <div>
      <t-avatar size="36px" :image="avatar" />
    </div>
    <div>
      <div class="common-author">
        <div>{{author}}</div>
      </div>
      <div class="common-md">
        <v-md-preview :text="content"></v-md-preview>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "common",
  props:{
    avatar:{
      type:String,
      default:'https://upload.wikimedia.org/wikipedia/zh/c/ce/HNU_Logo_in_2007.png'
    },
    author: {
      type:String,
      default: 'HFNU-chatGpt'
    },
    content:{
      type:String,
      default:'你好！'
    }
  }
}
</script>

<style scoped>
.common-md{
  margin-left: 22px;
  margin-top: 5px;
}
.common-author{
  margin-left: 22px;
  font-weight: 600;
}
</style>
