<template>
  <el-row :gutter="20">
    <TasksTable :BoardTagTile="{ dynamicTagText: 'todo', boardTasks: props.appTasks }" @save-tasks="updateTasks" @delete-tasks="deleteTasks"/>
    <TasksTable :BoardTagTile="{ dynamicTagText: 'doing', boardTasks: props.appTasks }" @save-tasks="updateTasks" @delete-tasks="deleteTasks"/>
    <TasksTable :BoardTagTile="{ dynamicTagText: 'done', boardTasks: props.appTasks }" @save-tasks="updateTasks" @delete-tasks="deleteTasks"/>
  </el-row>



</template>


<script setup>

import TasksTable from './board/TasksTable.vue';
import { onBeforeMount } from 'vue';
import {modifyTask,deleteTask} from '../utils/util.js'
const props = defineProps({
  appTasks: {},
})

const updateTasks = function (newTasks) {
  // console.log('------updateTasks更新后状态------');
  modifyTask(props.appTasks, "",newTasks);
}


const deleteTasks = function (newTasks) {
  // console.log('------删除后状态------');
  deleteTask(props.appTasks, newTasks.state,newTasks);
}

onBeforeMount(() => {
  // console.log('------Board onBeforeMount挂载前状态------');
  // for (const [key, value] of props.appTasks) {
  //   for (const index in value) {
  //     value[index].boardSet.isShowContent = false;
  //     value[index].boardSet.isEditingContent = false;
  //   }
  // }
});



</script>
   
<style></style>
  
  