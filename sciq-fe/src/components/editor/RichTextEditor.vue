<script setup lang="ts">
import { ref, onMounted, watch, defineEmits, defineProps } from 'vue';
import 'quill/dist/quill.snow.css';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '내용을 입력하세요'
  }
});

const emit = defineEmits(['update:modelValue']);

const editorContainer = ref<HTMLElement | null>(null);
let quill: any = null;

onMounted(async () => {
  if (typeof window !== 'undefined' && editorContainer.value) {
    const Quill = (await import('quill')).default;
    
    // 에디터 초기화
    quill = new Quill(editorContainer.value, {
      theme: 'snow',
      placeholder: props.placeholder,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean'],
          ['link', 'image']
        ]
      }
    });

    // 초기값 설정
    if (props.modelValue) {
      quill.root.innerHTML = props.modelValue;
    }

    // 에디터 변경 이벤트 감시
    quill.on('text-change', () => {
      emit('update:modelValue', quill.root.innerHTML);
    });
  }
});

// 외부에서 값이 변경될 경우 에디터에 반영
watch(() => props.modelValue, (newVal) => {
  if (quill && newVal !== quill.root.innerHTML) {
    quill.root.innerHTML = newVal;
  }
});
</script>

<template>
  <div class="rich-text-editor">
    <div ref="editorContainer" class="editor-container"></div>
  </div>
</template>

<style scoped>
.rich-text-editor {
  width: 100%;
}

.editor-container {
  height: 300px;
  overflow-y: auto;
  border-radius: 4px;
}

:deep(.ql-toolbar) {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #f8f9fa;
}

:deep(.ql-container) {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 16px;
  line-height: 1.5;
}

:deep(.ql-editor) {
  min-height: 250px;
}
</style> 