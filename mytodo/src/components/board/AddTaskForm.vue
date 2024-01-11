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
                    <a-input ref="inputRef" @pressEnter="handleOk" v-model:value="taskDemo.name" />
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
                <a-form-item label="思源链接" name="siyuanlink">

                    <a-select v-model:value="taskDemo.siyuanlink" mode="multiple" style="width: 100%"
                        placeholder="Select Item..."  @search="searchSql"   :filter-option="false"
                        :options="linkOptions"> </a-select>

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
import { reactive,watch } from "vue";
import { TaskStateEnum, initTask } from "../../utils/util.js";
import { ref, onUpdated } from 'vue';
import { sql } from "../../utils/siyuan-api.js";

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

//编辑框中
const taskDemo = reactive(initTask({ state: props.state }))


let inputRef = ref();
onUpdated(() => {
    // 确保在尝试重置字段和设置焦点之前等待表单完全更新
    formRef.value.$nextTick(() => {
        formRef.value.resetFields();
        const inputDom = inputRef.value;
        inputDom.focus();
    });
});

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
            const temp = initTask(taskDemo)
            // console.log('values', temp);
            emits('add-task', temp)
        })
        .catch(error => {
            console.log('error', error);
        });

};
const handleCancel = () => {
    open.value = false;
};

// link的操作
const linkOptions = ref([]);
//首先搜索好所有的标题
const searchSql = async (inputData)=>{
    // console.log(inputData)
    // console.log(taskDemo.siyuanlink)
    const temp = await sql("select (REPLACE(REPLACE(CAST(type AS VARCHAR), 'd', '文档'), 'h', '标题') || '--' || content) as label,id as value from blocks where (type = 'd' or type = 'h') and content LIKE'%"+inputData+"%'");
    //  console.log(temp.message.data)
    linkOptions.value = temp.message.data
    // console.log(linkOptions.value)
}



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