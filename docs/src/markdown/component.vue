<script setup lang="ts">

import { ref, onMounted, watchEffect, inject } from 'vue'
const routes = inject('routes')
import { EditorView, basicSetup} from "codemirror"

import { EditorState } from "@codemirror/state"


const value1 = ref();

// 响应式数据
const previewContent = ref("请在这里输入Markdown内容")

const editorContainer = ref<HTMLElement>()
let editorView: EditorView | null = null

// 初始化编辑器
onMounted(() => {
  if (!editorContainer.value) return
  console.log(import.meta.glob('../../src/**/*.md', { eager: true, query: '?raw' }));
  editorView = new EditorView({
    state: EditorState.create({
      doc: previewContent.value,
      extensions: [
        basicSetup,
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            previewContent.value = update.state.doc.toString()
          }
        })
      ]
    }),
    parent: editorContainer.value
  })
})
const createFile = () => {
  console.log(exec);
  // fs.mkdir(`src/markdown/${value1.value}`)
  
}
</script>

<template>
  <a-alert message="请先选择要添加文件的路径再创建" type="warning" show-icon/>
  <h4>Markdown文件添加</h4>
  <div class="create">
    <a-tree-select
      ref="select"
      size	="small"
      v-model:value="value1"
      style="width: 200px"
      @focus="focus"
      :tree-data="routes"
      @change="handleChange"
      allow-clear
      tree-default-expand-all
      tree-node-filter-prop="label"
      placeholder="请选择文件添加路径"
      />
      <a-button type="primary" size="small" @click="createFile">创建文件</a-button>
    </div>
  <div class="editor-container">
    <!-- 编辑器区域 -->
     <div ref="editorContainer" class="editor"></div>
    <!-- 预览区域 -->
    <h4 >预览Markdown内容</h4>
    <div class="preview">
      <pre>{{ previewContent }}</pre>
    </div>
  </div>
</template>

<style scoped>
h4{
  text-align: center;
  margin: 20px 0px !important;
  color: #004fff;
}
.editor-container {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

}

.editor,.preview {
  flex: 1;
  border: 1px solid #004fff;
  border-radius: 4px;
  overflow: hidden;
  padding:10px;
  margin-bottom: 30px;
  color: #666;
  min-height: 300px;
}

.create{
  background-color: rgba(0, 79, 255,.1);
  padding: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
v-deep .VPDoc{
  padding: 0px!important;
}
v-deep .VPSidebarItem {
  padding: 0 !important;
}
</style>