<template>
    <el-col :span="8">

        <div>
            <el-container>
                <el-header style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center;">
                        <el-tag>{{ dynamicTagText }}</el-tag>
                    </div>
                    <div>
                        <el-button type="primary" @click="handleButtonClick()">
                            <el-icon>
                                <Plus />
                            </el-icon>
                        </el-button>
                        <AddTaskForm :showForm='showForm' :state="dynamicTagText" @update-showForm="updateshowForm" @add-task="addTask"/>
                    </div>
                </el-header>
            </el-container>
        </div>
    </el-col>
</template>
   
<script>
import AddTaskForm from './AddTaskForm.vue';
import { addTask } from "../../utils/util.js";

export default {
    components: {
        AddTaskForm,
    },
    props: {
        BoardTagTile: {
            dynamicTagText: 'Dynamic Tag Text',
            boardTasks: [],
        }
    },
    computed: {
        dynamicTagText() {
            return this.BoardTagTile.dynamicTagText;
        },
        boardTasks() {
            return this.BoardTagTile.boardTasks;
        }
    },
    data() {
        return {
            showForm: false, //控制addTaskForm
        }
    },
    methods: {
        handleButtonClick() {
            //展示添加的编辑页面
            this.showForm = true;
            console.log('添加页面');
            console.log(this.showForm);
        },
        updateTasks(newTasks) {
            console.log('------updateTasks更新后状态------');
            this.tasks = newTasks;
        },
        updateshowForm(newValue){
            this.showForm = newValue;
        },
        addTask(newValue){
            addTask(this.boardTasks,newValue)
        },
    },
};
</script>
<style></style>