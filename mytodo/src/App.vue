<template>
  <el-menu default-active="/boardView" class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
    <el-menu-item index="boardView">看板</el-menu-item>
    <el-menu-item index="calendar">日历</el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item index="settings">
      <el-icon>
        <Setting />
      </el-icon>
      <span>设置</span>
    </el-menu-item>
  </el-menu>
  <router-view :appTasks="tasks"></router-view>
</template>
 

<script>
//引入子组件
import BoardView from './components/BoardView.vue';
import Calendar from './components/Calendar.vue';
import { getTasksContents, putTasksContents } from './utils/siyuan-api.js';
import { getWidgetBlockInfo,putTasks } from './utils/util.js';
// App掌握所有的Tasks，所有的修改都在这里
//获取tasks的值

let tasks = new Map();
tasks.set("todo", new Array());
tasks.set("doing", new Array());
tasks.set("done", new Array());

// let blockId = "20231218154508-sr0xvlc"
let blockId = getWidgetBlockInfo()
window.frameElement.style.height = '800px'; // 设置高度



export default {
  components: {
    BoardView,
  },
  data() {
    return {
      tasks,
      blockId,
    }
  },
  methods: {
    async getTasks() {
      let response_data = await getTasksContents(this.blockId.id)

      while (response_data.code == 500 || !response_data.message.data.hasOwnProperty("custom-tasksmap") ) {
        await putTasksContents(this.blockId.id, this.tasks);
        response_data = await getTasksContents(this.blockId.id);
      }

      //将response转成对象
      let tasksObject = JSON.parse(response_data.message.data["custom-tasksmap"]);

      Object.assign(this.tasks.get("todo"), tasksObject.todo);
      Object.assign(this.tasks.get("doing"), tasksObject.doing);
      Object.assign(this.tasks.get("done"), tasksObject.done);

      // console.log(this.tasks);
      
    },
  },
  beforeMount: function () {
    // console.group('------APP  created挂载前状态------');
    // console.log(new Date().toLocaleString())
    // console.groupEnd("end")
    this.getTasks()
  },   
}
</script>
 
<style>
.flex-grow {
  flex-grow: 1;
}
</style>

