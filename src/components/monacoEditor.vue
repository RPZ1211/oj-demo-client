<!-- 封装monaco-editor -->
<template>
  <div class="me-body">
    <div ref="monacoEditor" class="me-editor"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'

export default {
  name: "monacoEditor",
  props: {
    language: {
      type: String,
      default: "java",
    }, // 编译器语言
    value: {
      type: String,
      default: `tmp = input()
str = tmp.split(' ')
a = int(str[0])
b = int(str[1])
print(a+b)`
    }, // 初始化内容
    readOnly: {
      type: Boolean,
      default: false,
    }, // 编译器是否只读
    minimap: {
      type: Boolean,
      default: false,
    }, // 是否开启缩略图
    backgroundColor: {
      type: String,
      default: "#FFFFFF",
    }, // 背景颜色（默认白色）
  },

  data() {
    return {
      monacoEditor: {}, // 编辑器
    }
  },

  mounted() {
    this.initMonacoEditor();
    this.$emit("editorMounted", this.monacoEditor)
  },

  methods: {
    /**
     * 初始化编辑器
     */
    initMonacoEditor() {
      // 定义主题
      monaco.editor.defineTheme('grey-color', {
        base: 'vs',
        rules: [{ background: '#ffffff' }],
        colors: {
          'editor.background': this.backgroundColor,     //背景色
        }
      });
      // 创建代码编辑器
      this.monacoEditor = monaco.editor.create(this.$refs.monacoEditor, {
        language: this.language,
        value: this.value,
        readOnly: this.readOnly,
        theme: "grey-color",
        minimap: {
          enabled: this.minimap,
        },
      });
    }
  }
}
</script>

<style scoped>

.me-body {
  width: 100%;
  height: 100%;
  padding: 16px 0;
  box-sizing: border-box;
}

.me-editor {
  width: 100%;
  height: 100%;
}

</style>
