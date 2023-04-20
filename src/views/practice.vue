<!-- 题库练习 -->
<template>
  <div style="display: flex;justify-content: center">
    <!-- 习题 -->
    <questions-frame :state="2"></questions-frame>
  </div>
</template>

<script>
import QuestionsFrame from "@/components/question/questionsFrame.vue";

export default {
  name: "practice",
  components: {QuestionsFrame }
}
</script>

<style scoped>

.nb-top {
  margin-bottom: 0;
}

</style>