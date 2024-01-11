<template>
    <el-col   :span="8">
        <a-table ref="tableRef" style="background: transparent;" :data-source="dataSource" :customRow="customRow" :pagination="false" size="small" tableLayout="fixed">
            <a-table-column  key="nameKey" data-index="name" >
                <template #title >
                    <a-flex justify="space-between" align="center" >
                        <a-tag :color="TaskStateColorMap.get(BoardTagTile.dynamicTagText)">{{ BoardTagTile.dynamicTagText }}</a-tag>
                        <AddTaskForm :state="BoardTagTile.dynamicTagText" @add-task="addTaskTemp" />
                    </a-flex>
                </template>

                <template #default="{ record }" >
                    
                    <a-checkbox  :checked="record.state == 'done'"  @change="onCheckChange($event,record)" class="custom-checkbox">
                        <TaskPopover :TaskPopover_indata="{ task: record }" v-model:tableUlWidth="tableUlWidth" @save-task="saveChangeTask"
                            @delete-task="deleteTask" />
                    </a-checkbox>
                    
                </template>
            </a-table-column>
        </a-table>

    </el-col>
</template>

<script setup>
import AddTaskForm from './AddTaskForm.vue';
import TaskPopover from './TaskPopover.vue';
import { addTask,TaskStateColorMap,putTasks } from "../../utils/util.js";
import { ref,reactive,watchEffect ,onUpdated,onMounted, onBeforeUnmount } from "vue";


const emits = defineEmits(['save-tasks', 'delete-tasks']);
const props = defineProps({
    BoardTagTile: {
        dynamicTagText: 'Dynamic Tag Text',
        boardTasks: [],
    }
})


const onCheckChange = function  (e,task) {
    if (e.target.checked){
        //修改当前task的状态
        task.state = 'done';
        //修改当前task的完成时间
        task.updateTime = new Date().toLocaleString();
        emits('save-tasks', task);
    }
}

const tableRef = ref(null);
let tableUlWidth = ref(null)

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
onMounted(() => {
    window.addEventListener('resize', handleResize);
    tableUlWidth = tableRef.value.$el.clientWidth-35
});
const handleResize = function () {

    if (tableRef.value) {
        tableUlWidth = tableRef.value.$el.clientWidth-35
        // console.log(tableRef.value.$el.clientWidth)
        // console.log('tableUlWidth',tableUlWidth)
    }
}



let change1 = null; // 源目标数据序号
let change2 = null; // 目标数据序号
let dataSource = reactive(props.BoardTagTile.boardTasks.get(props.BoardTagTile.dynamicTagText));

const addTaskTemp = function (newValue) {
    // console.log(newValue)
    addTask(props.BoardTagTile.boardTasks, newValue)
}


const saveChangeTask = function (task) {
    // console.log("task", task)
    emits('save-tasks', task);
}

const deleteTask = function (task) {
    // console.log("deletetask", task)
    emits('delete-tasks', task);
}


// 拖动排序
const customRow = function (record, index) {
    // console.log(record, index)
    return {
        props: {
            // draggable: 'true'
        },
        style: {
            cursor: 'pointer'
        },
        // 鼠标移入
        onMouseenter: (event) => {
            // 兼容IE
            var ev = event || window.event;
            ev.target.draggable = true; // 让你要拖动的行可以拖动，默认不可以
        },
        // 开始拖拽
        onDragstart: (event) => {
            // 兼容IE
            var ev = event || window.event;
            // 阻止冒泡
            ev.stopPropagation();
            // 得到源目标数据序号
            change1 = index;
            // console.log(record, index, 'source');
        },
        // 拖动元素经过的元素
        onDragover: (event) => {
            // 兼容 IE
            var ev = event || window.event;
            // 阻止默认行为
            ev.preventDefault();
        },
        // 鼠标松开
        onDrop: (event) => {
            // 兼容IE
            var ev = event || window.event;
            // 阻止冒泡
            ev.stopPropagation();
            // 得到目标数据序号
            change2 = index;
            // 这里就是让数据位置互换，让视图更新 你们可以看record，index的输出，看是什么
            [dataSource[change1], dataSource[change2]] = [
                dataSource[change2],
                dataSource[change1]
            ];
            // console.log(props.BoardTagTile.boardTasks)
            // console.log(record, index, 'target');
            // 拖动更新数据
            putTasks(props.BoardTagTile.boardTasks)
        }
    }
}



</script>
   
<style>
.container {
    display: flex;
    align-items: center;
    /* 垂直居中 */
}

.custom-checkbox {
    zoom: 100%;

}
.ant-table-cell {
   background: transparent !important;
}

</style>
  
  