<!-- 题目框架 -->
<template>
  <div class="qf-body">

    <!-- 侧边栏 -->
<!--    <div :class="state === 1 ? 'qf-sidebar-learning' : 'qf-sidebar'">-->
<!--      <div-->
<!--          @click="currentQuestionIndex = id - 1"-->
<!--          v-for="id in questions.length" :key="id"-->
<!--          :class="['qf-sidebar-id', {'qf-sidebar-id-current': id - 1 === currentQuestionIndex}]"-->
<!--      >-->
<!--        {{ id }}-->
<!--      </div>-->
<!--    </div>-->

    <!-- 右侧内容区 -->
    <div :class="state === 1 ? 'qf-content-learning' : 'qf-content'">

      <!-- 上方题目区 -->
      <div class="qf-question">
        <question-detail :question="currentQuestion" :state="state" :isShowProgrammingResult.sync="isShowProgrammingResult"></question-detail>
        <question-analysis v-show="currentQuestion.isShowAnalysis" :question="currentQuestion"></question-analysis>
      </div>

      <!-- 操作区 -->
      <div class="qf-operation">
        <div class="qf-operation-inner">

          <!-- 收藏 -->
          <el-button v-if="isShowCollect" @click="collect" type="warning" icon="el-icon-star-off" class="qf-button-collect" plain>收藏</el-button>

          <!-- 上一题、下一题、[申述本题、本次作答情况] -->
          <div :class="`qf-operation-center-${isShowFeedback ? '1' : currentQuestion.isShowAnswerSituation ? '2' : '3'}`">
            <el-button @click="prevQuestion" :disabled="disabledPrev" icon="el-icon-arrow-left" class="qf-operation-button-prev">上一题</el-button>
            <el-button @click="nextQuestion" class="qf-operation-button-next" :disabled="disabledNext">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            <el-button v-if="isShowFeedback" type="warning" class="qf-operation-center-button-feedback" plain>申述本题</el-button>
            <el-button @click="$emit('showDialog', $event)" v-if="currentQuestion.isShowAnswerSituation" class="qf-operation-button-situation">本次作答情况</el-button>
          </div>

          <!-- 查看上次提交 -->
          <el-button v-if="currentQuestion.isShowPrevSubmit" @click="isShowProgrammingResult = true" class="qf-operation-button-show">查看上次提交</el-button>

          <!-- 提交 -->
          <el-button v-if="currentQuestion.isShowSubmit" @click="submit" type="primary" class="qf-button-submit">{{ state !== 3 ? "提交" : "提交试卷"}}</el-button>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import questionDetail from './questionDetail.vue';
import questionAnalysis from './questionAnalysis.vue'

export default {
  name: "questionsFrame",
  components: {questionDetail, questionAnalysis},
  props: {
    state: {
      type: Number,
      required: true,
    }, // 状态（1：学习中心、2：题库练习、3：比赛、4：比赛后查看试卷、5：比赛结束后智能练习）
    questionList: {
      type: Array,
      default: () => {
        return [
          // {
          //   type: 1,
          //   title: "在绘图编辑器的矢量图模式下，不可直接绘制的图形是（    ）",
          //   options: ["线段", "圆", "三角形", "矩形"],
          //   answer: "",
          // },
          // {
          //   type: 2,
          //   title: "关于C++你了解什么？",
          //   options: ["正确", "错误"],
          //   answer: "",
          // },
          // {
          //   type: 3,
          //   title: "1+1=2",
          //   options: [],
          //   answer: "",
          // },
          {
            type: 4,
            title: "简单题 - A PAT首页",
            content: '给你一个长度为 n 下标从 0 开始的字符串 blocks ，blocks[i] 要么是 \'W\' 要么是 \'B\' ，表示第 i 块的颜色。字符 \'W\' 和 \'B\' 分别表示白色和黑色。给你一个整数 k ，表示想要 连续 黑色块的数目。每一次操作中，你可以选择一个白色块将它 涂成 黑色块。请你返回至少出现 一次 连续 k 个黑色块的 最少 操作次数。', // 题目内容
            options: [],
            answer: "",
          },
        ]
      }
    }, // 题目列表
  },

  data() {
    return {
      currentQuestionIndex: 0, // 当前展示的题目索引

      isShowCollect: true, // 是否展示收藏按钮
      isShowFeedback: false, // 是否展示申述本题
      isShowProgrammingResult: false, // 是否展示编程题提交结果弹窗

      disabledPrev: true, // 禁用上一题按钮
      disabledNext: false, // 禁用下一题按钮
    }
  },

  computed: {

    /**
     * 处理后的题目列表
     * @returns {*[]}
     */
    questions() {
      let questionList = this.questionList;
      if (this.state === 1) {
        // 若为学习中心，则过滤掉程序题
        questionList = this.questionList.filter((question) => {
          return question.type !== 4;
        })
      }

      // 添加属性
      for (let i = 0; i < questionList.length; i++) {
        this.$set(questionList[i], "isShowAnalysis", this.state === 4); // 是否展示解析
        this.$set(questionList[i], "isShowComment", false); // 是否展示评论区
        this.$set(questionList[i], "isShowSubmit", true); // 是否展示提交按钮
        this.$set(questionList[i], "isShowPrevSubmit", false); // 是否展示查看上次提交按钮
        this.$set(questionList[i], "isShowAnswerSituation", false); // 是否展示本次作答情况按钮
      }

      return questionList;
    },

    /**
     * 当前题目对象
     */
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },

  watch: {
    currentQuestionIndex() {
      // 比赛后查看试卷页面 编程题展示申述本题
      this.isShowFeedback = this.state === 4 && this.currentQuestion.type === 4;
    }
  },

  created() {
    this.initData();
  },

  methods: {

    /**
     * 提交
     */
    submit() {
      switch (this.state) {
        case 1:
          // 学习中心
          this.commitOperation();
          break;

        case 2:
          // 题库练习
          if(this.currentQuestion.type !== 4) {
            // 非编程题
            this.commitOperation();
          } else {
            // 编程题
            this.isShowProgrammingResult = true; // 展示提交弹窗
            this.currentQuestion.isShowPrevSubmit = true; // 展示查看上次提交按钮
          }
          break;

        case 3:
          // 比赛
          // 展示提示弹窗
          this.$emit("showDialog");
          break;

        case 4:
          // 比赛后查看试卷
          break;

        case 5:
          // 比赛结束后智能练习
          this.currentQuestion.isShowAnswerSituation = true; // 展示本次作答情况按钮
          if(this.currentQuestion.type !== 4) {
            // 非编程题
            this.commitOperation();
          } else {
            // 编程题
            this.isShowProgrammingResult = true; // 展示提交弹窗
            this.currentQuestion.isShowPrevSubmit = true; // 展示查看上次提交按钮
          }
          break;

      }
    },

    /**
     * 非编程题提交通用操作
     */
    commitOperation() {
      this.currentQuestion.isShowAnalysis = true; // 展示解析
      this.currentQuestion.isShowComment = true; // 展示评论区
      this.currentQuestion.isShowSubmit = false; // 隐藏提交按钮
    },

    /**
     * 收藏题目
     */
    async collect() {
      let result = await addCollect({
        "collectType": 0,
        "resourceID": "11111",
        "userID": "111"
      })
      console.log("收藏结果如下:", result)
      if(result.data.code.code===200){
        message("收藏成功！", "success", "");
      }else if(result.data.code.code===0){
        message("已取消收藏！", "", "");
      }
    },

    /**
     * 上一题
     */
    prevQuestion() {
      this.disabledNext = false;
      this.currentQuestionIndex--;
      if (this.currentQuestionIndex === 0) {
        this.disabledPrev = true;
      }
    },

    /**
     * 下一题
     */
    nextQuestion() {
      this.disabledPrev = false;
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex === this.questions.length - 1) {
        this.disabledNext = true;
      }
    },

    /**
     * 初始化数据
     */
    initData() {
      // 只有一题，则上、下一题都不可点击
      if (this.questions.length === 1) {
        this.disabledNext = true;
      }

      // 比赛、比赛后查看试卷页面 取消收藏按钮
      if([3, 4].includes(this.state)) {
        this.isShowCollect = false; // 不展示收藏按钮
      }

      // 比赛后查看试卷页面 不展示提交按钮
      if(this.state === 4) {
        for (let i = 0; i < this.questions.length; i++) {
          this.questions[i].isShowSubmit = false; // 不展示提交按钮
        }
      }
    },

  }
}
</script>
<style scoped>

.qf-body {
  display: flex;
  font-size: 16px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #262626;
}

.qf-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: calc(100vh - 80px);
  background-color: white;
  box-shadow: inset -1px 0 0 0 #F0F1F4;
  border-radius: 8px 0 0 8px;
  border-top: 1px solid #f1f2f5;
  box-sizing: border-box;
}

.qf-sidebar-learning {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: calc(100vh - 100px);
  background-color: white;
  border-radius: 8px 0 0 8px;
  border-right: 1px solid #f1f2f5;
  box-sizing: border-box;
}

.qf-sidebar-id-current,
.qf-sidebar-id {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  font-size: 14px;
  background: #FFFFFF;
  border-radius: 50%;
  border: 1px solid #D9DCE2;
  margin-top: 24px;
  box-sizing: border-box;
  cursor: pointer;
}

.qf-sidebar-id-current {
  color: #FFFFFF;
  background: #289CF8;
  border: 1px solid #289CF8;
}

.qf-content {
  width: 1792px;
  height: calc(100vh - 100px);
  background: #FFFFFF;
  border-radius: 8px;
  margin: 24px;
}

.qf-content-learning {
  width: 1472px;
  height: calc(100vh - 120px);
}

.qf-question {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 60px);
  overflow: scroll;
}

.qf-operation {
  position: sticky;
  bottom: 0;
  height: 80px;
  box-shadow: inset 0 1px 0 0 #F0F1F4;
  border-radius: 0 0 8px 8px;
  border-top: 1px solid #f1f2f5;
  box-sizing: border-box;
  background-color: white;
}

.qf-operation-inner {
  position: relative;
  height: 100%;
}

.qf-button-submit,
.qf-button-collect {
  width: 88px;
  height: 32px;
  padding: 0;
}

.qf-button-collect {
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translateY(-50%);
}

.qf-button-submit {
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
}

.qf-operation-center-3,
.qf-operation-center-2,
.qf-operation-center-1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% + 60px), -50%);
}

.qf-operation-center-2 {
  transform: translate(calc(-50% + 68px), -50%);
}

.qf-operation-center-3 {
  transform: translate(-50%, -50%);
}

.qf-operation-center-button {
  width: 100px;
  margin: 0 20px 0 0;
}

.qf-operation-button-prev {
  width: 100px;
  height: 32px;
  padding: 0;
}

.qf-operation-button-next {
  width: 100px;
  height: 32px;
  padding: 0;
  margin: 0 0 0 20px;
}

.qf-operation-center-button-feedback {
  width: 100px;
  height: 32px;
  padding: 0;
  margin: 0 0 0 20px;
}

.qf-operation-button-situation {
  width: 116px;
  height: 32px;
  padding: 0;
  margin: 0 0 0 20px;
}

.qf-operation-button-show {
  position: absolute;
  top: 50%;
  right: 123px;
  transform: translateY(-50%);
  width: 116px;
  height: 32px;
  padding: 0;
}


</style>
