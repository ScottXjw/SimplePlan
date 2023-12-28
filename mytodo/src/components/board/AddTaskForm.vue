<template>
    <div>
        <el-button type="primary" @click="showModal">
            <el-icon>
                <Plus />
            </el-icon>
        </el-button>

        <a-modal v-model:open="open" title="新增任务" :footer="null">

            <a-form :model="taskDemo" :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef" :rules="rules">
                <a-form-item label="任务名称" name="name">
                    <a-input v-model:value="taskDemo.name" />
                </a-form-item>

                <a-form-item label="任务状态">
                    <a-radio-group v-model:value="taskDemo.state" :options="stateOptions">

                    </a-radio-group>
                </a-form-item>
                <a-form-item label="截止时间">
                    <a-date-picker v-model:value="taskDemo.deadline" show-time type="datetime" placeholder="选择日期和时间(可以不选)"
                        style="width: 100%" value-format="YYYY/MM/DD HH:mm:ss" />
                </a-form-item>
                <a-form-item label="任务描述" name="desc">
                    <a-textarea v-model:value="taskDemo.desc" :autoSize="{ minRows: 5, maxRows: 10 }" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <el-button type="primary" @click="handleOk">Create</el-button>
                    <el-button style="margin-left: 10px" @click="handleCancel">Cancel</el-button>
                </a-form-item>
            </a-form>

        </a-modal>
    </div>
</template>
   

<script setup>
import { reactive } from "vue";
import { TaskStateEnum, initTask } from "../../utils/util.js";
import { ref } from 'vue';
import { toRaw } from 'vue';

const open = ref(false);
const formRef = ref();
const rules = {
    name: [
        { required: true, message: '请输入任务名称', trigger: 'blur' }
    ],
    state: [

    ],
    desc: [
        // { required: true, message: '请输入任务描述', trigger: 'blur' },
    ],
}


const emits = defineEmits(['add-task']);
const props = defineProps({
    state: {
        type: String,
        default: TaskStateEnum.Todo
    },
})



const showModal = () => {
    open.value = true;
};
const handleOk = () => {
    //表单验证
    formRef.value
        .validate()
        .then(() => {
            //成功

            open.value = false;
            //这里需要添加到tasks中
            // 触发事件将修改通知给父组件
            // const temp = initTask({
            //     name: taskDemo.name,
            //     state: taskDemo.state,
            //     deadline: taskDemo.deadline,
            //     desc: taskDemo.desc,
            // })
            const temp = initTask(taskDemo)
            // console.log('values', temp);
            emits('add-task',temp)
        })
        .catch(error => {
            console.log('error', error);
        });

};
const handleCancel = () => {
    open.value = false;
};


//编辑框中
const taskDemo = reactive(initTask({ state: props.state }))

const stateOptions = [
    { label: 'Todo', value: 'todo', disabled: true },
    { label: 'Doing', value: 'doing', disabled: true },
    { label: 'Done', value: 'done', disabled: true },
] //状态选择器

//样式
const labelCol = {
    style: {
        width: '150px',
    },
};
const wrapperCol = {
    span: 14,
};

</script>


<style>
.add-from-dialog {
    width: 50%;
    min-width: 380px;
}
</style>