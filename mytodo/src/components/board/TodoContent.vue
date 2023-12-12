<template>
    <el-col :span="8" style="text-align: center;">
        <div v-for="(task, index) in tasksList" :key="index" style="margin-bottom: 10px; ">
            <el-popover :visible="task.boardSet.isShowContent" placement="bottom" title="任务详情" :width="350">
                <el-descriptions :column=1 :colon="false">
                    <el-descriptions-item label="任务名称">
                        <span v-if="!task.boardSet.isEditingContent">{{ task.name }}</span>
                        <el-input v-else v-model="task.boardSet.editedTask.name" @input="$forceUpdate()" type="text"
                            placeholder="请输入文本"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item label="任务状态">

                        <span v-if="!task.boardSet.isEditingContent">{{ task.state }}</span>
                        <el-select v-else v-model="task.boardSet.editedTask.state" @change="$forceUpdate()">
                            <el-option label="todo" value="todo"></el-option>
                            <el-option label="doing" value="doing"></el-option>
                            <el-option label="done" value="done"></el-option>
                        </el-select>
                    </el-descriptions-item>

                    <el-descriptions-item label="创建时间">{{ formatTime(task.createTime) }}</el-descriptions-item>
                    <el-descriptions-item label="更新时间">{{ formatTime(task.updateTime) }}</el-descriptions-item>

                    <el-descriptions-item v-if="task.deadline != ''" label="截止时间">
                        <span v-if="!task.boardSet.isEditingContent">{{ formatTime(task.deadline) }}</span>
                        <div v-else class="block">
                            <el-date-picker v-model="task.boardSet.editedTask.deadline" type="datetime"
                                @input="$forceUpdate()" placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </el-descriptions-item>

                    <el-descriptions-item label="任务描述">
                        <span v-if="!task.boardSet.isEditingContent">{{ task.desc }}</span>
                        <el-input v-else type="textarea" placeholder="请输入文本" v-model="task.boardSet.editedTask.desc"
                            :autosize="{ minRows: 4, maxRows: 7 }" @input="$forceUpdate()"></el-input>
                    </el-descriptions-item>
                </el-descriptions>

                <div v-if="!task.boardSet.isEditingContent" style="text-align: right; margin: 0">
                    <el-button @click="task.boardSet.isShowContent = false">取消</el-button>
                    <el-button type="primary" @click="openEditView(task)">修改</el-button>
                </div>
                <div v-else style="text-align: right; margin: 0">
                    <el-button @click="task.boardSet.isEditingContent = false">取消</el-button>
                    <el-button type="primary" @click="modifyTask(tasks, task, task.boardSet.editedTask)">确认修改</el-button>
                </div>

                <template #reference >
                    <div>
                        <el-button style="width: 90%;" @click="task.boardSet.isShowContent = !task.boardSet.isShowContent">
                            <div  class="todo-text">
                                {{ task.name }}
                            </div>
                        </el-button>
                    </div>

                </template>
            </el-popover>

        </div>
    </el-col>
</template>
   

<script>
import { modifyTask, formatTime } from "../../utils/util.js";
import { ElMessage } from 'element-plus'
//子组件接收
export default {

    props: ['boardTasks', 'boardTitle'],
    setup(props, context) {
        // 使用defineEmits创建名称，接受一个数组
        return {
            tasks: props.boardTasks,
            tasksState: props.boardTitle,
        }
    },
    data() {
        return {
            tasksList: this.tasks.get(this.tasksState),
            editedTask: {},
        }
    },
    methods: {
        formatTime,
        openEditView(task) {
            //task的克隆
            this.cloneTask(task.boardSet.editedTask, task)
            task.boardSet.isEditingContent = true;
        },
        modifyTask(tasks, task, editedTask) {
            //首先判断name是否为空
            editedTask.name = editedTask.name.trim();
            if (editedTask.name === '') {
                //如果为空，则不修改
                ElMessage.error('任务名称不能为空')
            } else {
                //修改task
                modifyTask(tasks, this.tasksState, editedTask);
                //刷新task
                this.updateTasksNow();
                //关闭isEditing
                task.boardSet.isEditingContent = false;
            }
        },
        updateTasksNow() {
            // 触发事件将修改通知给父组件
            this.$emit('update-tasks', this.tasks);
        },
        onclick(id) {
            var temp = document.getElementById('TodoContent' + id)
            temp.click()
        },
        cloneTask(editedTask, task) {
            editedTask.id = task.id;
            editedTask.name = task.name;
            editedTask.state = task.state;
            editedTask.createTime = task.createTime;
            editedTask.updateTime = task.updateTime;
            editedTask.deadline = task.deadline;
            editedTask.desc = task.desc;
        }
    },
    beforeMount: function () {
        console.log('------ ' + this.tasksState + ' TodoContent beforeMount挂载前状态------');
        const temp = this.tasks.get(this.tasksState);
    },
}







</script>


<style>
.todo-text {
    text-align: center;
    /* 文本居中对齐 */
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 隐藏超出容器的部分 */
    text-overflow: ellipsis;
    /* 超出时显示省略号 */
    max-width: 13em;
    /* 设置宽度为 90%（根据需要进行调整） */
    /* margin-top: 5px; */
    margin: auto;
}
</style>