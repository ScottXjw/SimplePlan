<template>
  <el-row :gutter="20">
    <TagAndButtonLayout :BoardTagTile="{ dynamicTagText: 'todo', boardTasks: tasks }" />
    <TagAndButtonLayout :BoardTagTile="{ dynamicTagText: 'doing', boardTasks: tasks }" />
    <TagAndButtonLayout :BoardTagTile="{ dynamicTagText: 'done', boardTasks: tasks }" />
  </el-row>

  <el-row :gutter="20">
    <TodoContent :boardTasks="tasks" :boardTitle="'todo'" @update-tasks="updateTasks" />
    <TodoContent :boardTasks="tasks" :boardTitle="'doing'" @update-tasks="updateTasks" />
    <TodoContent :boardTasks="tasks" :boardTitle="'done'" @update-tasks="updateTasks" />
  </el-row>
</template>

<script>
import TagAndButtonLayout from './board/TagAndButtonLayout.vue';
import TodoContent from './board/TodoContent.vue';

export default {
  components: {
    TagAndButtonLayout,
    TodoContent
  },
  props: ['appTasks'],
  setup(props, context) {
    return {
      tasks: props.appTasks // 父组件传给子组件的值
    }
  },
  methods: {
    updateTasks(newTasks) {
      console.log('------updateTasks更新后状态------');
      this.tasks = newTasks;

    },
  },
  beforeMount: function () {
    console.log('------Board beforeMount挂载前状态------');
    // 初始化this.tasks,遍历Map中的元素,清除展示和编辑框图
    for (var [key, value] of this.tasks) {
      for (var index in value) {
        value[index].boardSet.isShowContent = false;
        value[index].boardSet.isEditingContent = false;
      }
    }
  },
}
</script>
   
<style></style>
  
  