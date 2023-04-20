<!-- 四种类型题目 -->
<template>
  <div>

      <!-- 单选题、判断题 -->
      <template v-if="[1, 2].includes(question.type)">
        <div class="qd-body">
          <div class="qd-title">{{question.title}}</div>
          <div @click="changeOption(index)" class="qd-option" v-for="(option, index) in question.options" :key="index">
            <div :class="['qd-option-id', {'qd-option-id-current': optionId[index] === question.answer}]">{{ optionId[index] }}</div>
            <div class="qd-option-text">{{option}}</div>
          </div>
        </div>
      </template>

      <!-- 解答题 -->
      <template v-else-if="question.type === 3">
        <div class="qd-body">
          <div class="qd-title">{{question.title}}</div>
          <el-input
              v-model.trim="question.answer"
              type="textarea"
              placeholder="请输入答案"
              resize="none"
              :readonly="!question.isShowSubmit || state === 4"
              clearable
              autosize
          />
        </div>
      </template>

      <!-- 程序题 -->
      <template v-else-if="question.type === 4 && state !== 4">
        <programming-question
            @changeShowProgrammingResult="(value) => {$emit('update:isShowProgrammingResult', value)}"
            :isShowProgrammingResult="isShowProgrammingResult"
        />
      </template>

  </div>

</template>
<script>
import programmingQuestion from "@/components/question/programmingQuestion.vue";

export default {
  name: "questionDetail",
  components: {programmingQuestion},
  props: {
    question: Object, // 题目数据
    state: Number, // 状态（1：学习中心、2：题库练习、3：比赛、4：比赛后查看试卷、5：比赛结束后智能练习）
    isShowProgrammingResult: Boolean, // 是否展示编程题提交结果
  },

  data() {
    return {
      optionId: ["A", "B", "C", "D"], // 选项id
    }
  },

  methods: {

    /**
     * 点击选项
     * @param questionIndex 选项索引
     */
    changeOption(questionIndex) {
      if(this.question.isShowSubmit && this.state !== 4) {
        // 未提交时，可以修改答案
        this.question.answer = this.optionId[questionIndex];
      }
    }
  },
}

</script>
<style scoped>

.qd-body {
  width: 1008px;
  margin: 24px 0;
  font-size: 16px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #262626;
  line-height: 24px;
}

.qd-title {
  margin-bottom: 25px;
}

.qd-option {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
}

.qd-option-id-current,
.qd-option-id {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  font-size: 14px;
  background: #FFFFFF;
  border-radius: 50%;
  border: 1px solid #D9DCE2;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 12px;
}

.qd-option-id-current {
  color: #FFFFFF;
  background: #289CF8;
  border: 1px solid #289CF8;
}

.qd-option-text {
  white-space: normal;
}

::v-deep .el-textarea__inner {
  min-height: 64px !important;
  background: #F4F5F7;
  border: none;
}


</style>
