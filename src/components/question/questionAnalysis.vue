<template>
  <div>
    <!-- 非编程题解析 -->
    <template v-if="question.type !== 4">
      <div class="qa-analysis">
        <div class="qa-answer">
          <div class="qa-notch"></div>
          <div class="qa-text">我的答案</div>
        </div>
        <pre class="qa-text-content">daan</pre>
        <div class="qa-dash"></div>
        <div class="qa-answer">
          <div class="qa-notch"></div>
          <div class="qa-text">正确答案</div>
        </div>
        <pre class="qa-text-content">daan</pre>
        <div class="qa-dash"></div>
        <div class="qa-answer">
          <div class="qa-notch"></div>
          <div class="qa-text">解析</div>
        </div>
        <pre class="qa-text-content">{{ "type不是Python保留字，而是内置函数 type()。" }}</pre>
      </div>
    </template>

    <!-- 编程题解析 -->
    <template v-else-if="question.type === 4">
      <div class="qa-programming-title">{{ question.content }}</div>
      <div class="qa-programming">
        <!-- 我的答案 -->
        <div class="qa-programming-answer">
          <div class="qa-programming-shape"></div>
          <div class="qa-programming-text">我的答案</div>
        </div>

        <!-- 代码 -->
        <div class="qa-programming-code">
          <monaco-editor @editorMounted="(monacoEditor) => {this.monacoEditor = monacoEditor}" backgroundColor="#fafafb" readOnly></monaco-editor>
        </div>

        <!-- 测试结果 -->
        <div v-for="(result, index) in results" :key="index">
          <div class="qa-programming-result-line"></div>
          <div class="qa-programming-answer">
            <div class="qa-programming-shape"></div>
            <div class="qa-programming-text">后台测试结果{{ index + 1 }}</div>
          </div>
          <div class="qa-programming-result-text" :class="result === '答案错误' ? 'qa-programming-result-text-error' : ''">{{ result }}</div>
        </div>

      </div>
    </template>
  </div>
</template>

<script>
import monacoEditor from "@/components/monacoEditor";

export default {
  name: "questionAnalysis",
  components: {monacoEditor},
  props: {
    question: Object, // 题目数据
  },
  data() {
    return {
      monacoEditor: {}, // 编辑器
      results: ["答案正确", "答案错误", "答案错误"], // 测试结果
    }
  },
}
</script>

<style scoped>
.qa-analysis {
  /* min-width: 1008px;
  min-height: 273px; */
  width: 1008px;
  height: 273px;
  background: #FAFAFB;
  border-radius: 4px;
  margin: 8px 0 40px 0;
}

.qa-answer {
  padding-top: 19px;
  height: 16px;
  display: flex;
}

.qa-notch {
  width: 3px;
  height: 14px;
  background: #289CF8;
  border-radius: 2px;
  margin-top: 5px;
  margin-right: 6px;
  margin-left: 24px;
}

.qa-text {
  font-size: 16px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #595959;
  line-height: 22px;
}

.qa-text-content {
  font-size: 16px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #595959;
  line-height: 18px;
  display: flex;
  margin-top: 16px;
  margin-left: 24px;
}

.qa-dash {
  width: 960px;
  height: 1px;
  /* border:1px 0px 1px 0px solid #E4E7ED; */
  border-bottom: 1px dashed #E4E7ED;
  padding-top: 20px;
  margin-left: 24px;
}

.qa-programming-title {
  width: 1008px;
  font-size: 16px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #262626;
  margin: 24px auto;
}

.qa-programming {
  width: 1008px;
  background: #FAFAFB;
  border-radius: 4px;
  margin: 24px auto 0 auto;
  padding: 28px 24px 4px 24px;
  box-sizing: border-box;
}

.qa-programming-answer {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.qa-programming-shape {
  width: 3px;
  height: 14px;
  background: #289CF8;
  border-radius: 2px;
  margin-top: 3px;
}

.qa-programming-text {
  font-size: 16px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #595959;
  margin-left: 6px;
}

.qa-programming-code {
  height: 300px;
  margin-bottom: 26px;
}

::v-deep .me-body {
  /*background-color: red !important;*/
}

.qa-programming-result-line {
  width: 960px;
  height: 1px;
  border: 1px dashed #E4E7ED;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.qa-programming-result-text {
  font-size: 16px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #67C23A;
  margin-bottom: 20px;
}

.qa-programming-result-text-error {
  color: #FF6767;
}

</style>
