<!-- OJ 组件 -->
<template>
  <div class="et-body">

    <!-- 顶部操作栏 -->
    <div class="et-top">

      <!-- 语言选择 -->
      <el-select v-model="language" placeholder="请选择">
        <el-option v-for="(language, index) in languageOptions" :key="index" :label="language" :value="language"/>
      </el-select>

      <!-- 设置 -->
      <el-popover v-model="showSet" placement="bottom-start" width="232">
        <div class="et-popover">
          <!-- 字号 -->
          <div class="et-popover-item">
            <div>字号</div>
            <el-select v-model="fontSize" placeholder="请选择">
              <el-option v-for="(fontSize, index) in fontSizeOptions" :key="index" :label="fontSize" :value="fontSize"/>
            </el-select>
          </div>

          <!-- Tab长度 -->
          <div class="et-popover-item">
            <div>Tab长度</div>
            <el-select v-model="tabLength" placeholder="请选择">
              <el-option v-for="(tabLength, index) in tabLengthOptions" :key="index" :label="tabLength"
                         :value="tabLength"/>
            </el-select>
          </div>

          <!-- 显示空白字符 -->
          <div class="et-popover-item">
            <div>显示空白字符</div>
            <el-switch v-model="displayBlankChar"></el-switch>
          </div>

          <!-- 取消、确定 -->
          <div class="et-popover-button">
            <el-button size="mini" type="text" @click="showSet = false">取消</el-button>
            <el-button type="primary" size="mini" @click="showSet = false">确定</el-button>
          </div>
        </div>
        <svg slot="reference" class="icon et-icon" aria-hidden="true">
          <use xlink:href="#icon-a-20shezhi"></use>
        </svg>
      </el-popover>

      <!-- 撤销 -->
      <svg class="icon et-icon" aria-hidden="true">
        <use xlink:href="#icon-chexiao-you"></use>
      </svg>

      <!-- 反撤销 -->
      <svg class="icon et-icon" aria-hidden="true">
        <use xlink:href="#icon-chexiao-zuo"></use>
      </svg>

      <!-- 刷新 -->
      <svg class="icon et-icon" aria-hidden="true">
        <use xlink:href="#icon-shuaxin"></use>
      </svg>

      <!-- 全屏 -->
      <svg @click="$emit('fullScreen', $event)" class="icon et-right-icon" aria-hidden="true">
        <use xlink:href="#icon-zuidahua"></use>
      </svg>
    </div>

    <!-- 编辑器 -->
    <div class="et-editor">
      <monaco-editor @editorMounted="(monacoEditor) => {this.monacoEditor = monacoEditor}" backgroundColor="#FFFFFF"/>
    </div>

    <!-- 底部操作栏 -->
    <div v-show="isFullScreen === false" class="et-bottom">

      <!-- 输入、输出区 -->
      <el-collapse-transition>
        <div v-if="showBottomPopover" class="et-bottom-content">
          <div class="et-bottom-content-et">
            <monaco-editor @editorMounted="(monacoEditor) => {this.IOEditor = monacoEditor}"/>
          </div>
          <el-button @click="run" type="primary" plain>运行</el-button>
        </div>
      </el-collapse-transition>

      <!-- 顶部选择框 -->
      <div class="et-bottom-top">
        <div
            @click="currentTagPage = 0; showBottomPopover = true"
            class="et-bottom-top-item"
            :class="currentTagPage === 0 ? 'et-bottom-top-item-current' : ''"
        >
          测试用例
        </div>
        <div
            v-show="isRun"
            @click="currentTagPage = 1; showBottomPopover = true"
            class="et-bottom-top-item"
            :class="currentTagPage === 1 ? 'et-bottom-top-item-current' : ''"
        >
          编译器输出
        </div>

        <!-- 展开、收起图标 -->
        <div @click="showPopover" class="et-bottom-icon">
          <i :class="showBottomPopover ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import monacoEditor from "@/components/monacoEditor";
import {codeTest} from "@/api/code.api";

export default {
  name: "editor",
  components: {monacoEditor},
  props: {
    isFullScreen: {
      type: Boolean,
      default: false,
    }, // 是否全屏
  },
  data() {
    return {
      monacoEditor: {}, // 代码编辑器 this.editor.getValue() 获取文本内容
      IOEditor: {}, // 输入、输出编辑器

      language: "C(gcc)", // 语言选择
      languageOptions: ["C(gcc)", "C++(g++)", "java(javac)", "Python(python2)", "Python(python3)", "JavaScript(node)"], // 语言数据
      fontSize: 14, // 字号选择
      fontSizeOptions: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], // 字号数据
      tabLength: "4个空格", // tab长度
      tabLengthOptions: ["2个空格", "4个空格", "6个空格", "8个空格"], // tab长度数据

      displayBlankChar: true, // 显示空白字符
      showSet: false, // 展示设置

      currentTagPage: -1, // 当前标签页（0：测试用例、1：编译器输出）
      showBottomPopover: false, // 是否展示底部弹窗（输入、输出）
      isRun: false, // 是否运行过
    }
  },

  watch: {
    // 展示底部弹窗中的编辑器
    currentTagPage(value) {
      this.$nextTick(() => {
        if(value === 0) {
          this.IOEditor.updateOptions({readOnly: false});
          this.IOEditor.setValue(" ");
        } else if(value === 1) {
          this.IOEditor.updateOptions({readOnly: true});
          this.IOEditor.setValue("s=50.27\nv=33.51");
        }
      })
    },
  },

  methods: {

    /**
     * 获取编辑器中的代码
     */
    async getCode() {
      console.log(this.monacoEditor.getValue().toString())
      let params = {
        code:this.monacoEditor.getValue().toString(),
        // code: "tmp = input()\r\nstr = tmp.split(' ')\r\na = int(str[0])\r\nb = int(str[1])\r\nprint(a+b)",
        input_case: ["123 123","123 122"],
        output_case: ["246","246"],
        time: 1000,
        memory: 100000,
        language: "python",
        result_type: "json"
      }
      let start_time=new Date().getTime()
      let res = await codeTest(params)
      let end_time=new Date().getTime()
      console.log("耗时：",end_time-start_time)
      console.log("代码测试结果如下：",res)
      let codeRunResult=[]
      let resultState = ["答案正确", "1", "运行超时", "3", "答案错误","编译错误"];
      for (let i=0;i<res.data.result.length;i++){
        let data={
          date: new Date().getTime(), // 提交时间
          state: resultState[res.data.result[i].result],//case
          score: 20, // 分数
          compiler: res.data.language, // 编译器
          memory: res.data.result[i].memoryused, // 内存
          spentTime: res.data.result[i].timeused // 用时
        }
        codeRunResult.push(data)
      }
      this.$store.commit('updateCodeRunResult',codeRunResult)
      localStorage.setItem('editorCode', this.monacoEditor.getValue())
    },

    /**
     * 展示底部弹窗
     */
    showPopover() {
      this.currentTagPage = this.showBottomPopover ? -1 : 0;
      this.showBottomPopover = !this.showBottomPopover;
    },

    /**
     * 运行测试用例
     */
    run() {
      this.isRun = true;
      this.currentTagPage = 1;
    }
  },
}
</script>

<style scoped>

.et-body {
  position: relative;
  height: 843px;
  width: 100%;
  background-color: #fff;
}

.et-top {
  position: relative;
  width: 100%;
  height: 52px;
  background-color: #f4f5f7;
  border-radius: 0 8px 0 0;
  border: 1px solid #D9DCE2;
  padding: 8px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

::v-deep .el-input__inner {
  height: 36px;
}

.et-icon {
  margin-left: 16px;
  cursor: pointer;
}

.et-right-icon {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;
}

.et-popover {
  padding: 4px 12px 12px 12px;
  box-sizing: border-box;
}

.et-popover-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #262626;
}

::v-deep .et-popover-item .el-input__inner {
  width: 126px;
}

.et-popover-button {
  text-align: right;
}

.et-editor {
  height: 739px;
  border-left: 1px solid #D9DCE2;
  border-right: 1px solid #D9DCE2;
  box-sizing: border-box;
}

.et-bottom {
  position: sticky;
  bottom: 52px;
  width: 100%;
}

.et-bottom-top {
  position: sticky;
  bottom: 0;
  display: flex;
  height: 52px;
  background: #f4f5f7;
  border: 1px solid #D9DCE2;
  box-sizing: border-box;
}

.et-bottom-icon {
  width: 104px;
  height: 52px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
}

.et-bottom-top-item-current,
.et-bottom-top-item {
  width: 104px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #262626;
  cursor: pointer;
  box-sizing: border-box;
}

.et-bottom-top-item-current {
  height: 53px;
  background-color: white;
  border: 1px solid #D9DCE2;
  border-top: none;
}

.et-bottom-content {
  position: absolute;
  bottom: 52px;
  width: 100%;
  height: 394px;
  background-color: white;
  border-left: 1px solid #D9DCE2;
  border-right: 1px solid #D9DCE2;
  padding: 16px;
  box-sizing: border-box;
}

.et-bottom-content-et {
  width: 100%;
  height: 298px;
  border: 1px solid #E6E9EE;
}

::v-deep .et-bottom-content .el-button {
  position: absolute;
  bottom: 16px;
  right: 16px;
  margin-top: 16px;
}

</style>
