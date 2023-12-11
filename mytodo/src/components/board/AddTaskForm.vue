<template>
    <el-dialog class="add-from-dialog" v-model="isShowForm" :show-close="true" @close="closeDialog">

        <el-form :model="taskDemo" label-width="100px" :rules="rules" ref="baseForm">
            <el-form-item label="任务名称:" prop="name">
                <el-input v-model="taskDemo.name"></el-input>
            </el-form-item>

            <el-form-item label="任务状态:" prop="state">
                <el-radio-group :disabled="stateOptions.disabled" v-model="taskState">
                    <el-radio :label="'todo'">todo</el-radio>
                    <el-radio :label="'doing'">doing</el-radio>
                    <el-radio :label="'done'">done</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="截止时间:">
                <el-switch v-model="isSwitch" active-text="" inactive-text=""></el-switch>
            </el-form-item>

            <el-form-item v-if="isSwitch" :prop="isSwitch ? 'deadline' : []">
                <el-col>
                    <el-date-picker v-model="taskDemo.deadline" type="datetime" placeholder="选择日期时间"
                        :default-time="defaultTime" />
                </el-col>
            </el-form-item>

            <el-form-item label="描述:" prop="desc">
                <el-input type="textarea" v-model="taskDemo.desc" :autosize="{ minRows: 5, maxRows: 10 }"
                    placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="showForm = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
   
<script>
import { reactive } from "vue";
import { TaskStateEnum, initTask } from "../../utils/util.js";
let defaultTime = new Date(2000, 1, 1, 12, 0, 0);


const rules = reactive({
    name: [
        { required: true, message: '请输入任务名称', trigger: 'blur' },
    ],
    state: [

    ],
    desc: [
        // { required: true, message: '请输入任务描述', trigger: 'blur' },
    ],
})


export default {
    props: {
        showForm: {
            type: Boolean,
            default: false
        },
        state: {
            type: String,
            default: TaskStateEnum.Todo
        },
    },
    computed: {
        isShowForm() {
            return this.showForm;
        },
        taskState() {
            return this.state;
        },
    },
    data() {
        return {
            taskDemo: initTask({ state: this.state }),
            stateOptions: {
                radio: 'todo',
                disabled: true,
            },  //状态选择器
            isSwitch: true, //是否启用截止日期
            defaultTime,
            rules,
        }
    },
    methods: {
        onSubmit() {

            // 表单验证
            this.$refs.baseForm.validate(async (valid) => {
                if (valid) {
                    if(!this.isSwitch){
                        this.taskDemo.deadline = '';
                    }
                    // 验证通过 
                    // 触发事件将修改通知给父组件
                    this.$emit('add-task', this.taskDemo);
                    this.updateshowForm();
                } else {

                }
            }
            );


        },
        updateshowForm() {
            // 触发事件将修改通知给父组件
            this.$emit('update-showForm', false);
        },
        closeDialog() {
            this.taskDemo = initTask()
            this.updateshowForm();
        },
    },
    beforeMount: function () {
        console.log('------AddTaskForm beforeMount挂载前状态------');
    },
};
</script>
<style>
.add-from-dialog {
    width: 50%;
    min-width: 380px;
}
</style>