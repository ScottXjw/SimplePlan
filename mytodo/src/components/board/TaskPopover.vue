<template>
    <a-popover trigger="hover" :open="hovered" @openChange="handleHoverChange" placement="bottomLeft">
        <template #content>
            <a-descriptions size="small" :column="1" bordered>
                <a-descriptions-item style="max-width: 15vmax">
                    {{ TaskPopover_indata.task.name }}
                </a-descriptions-item>
            </a-descriptions>
        </template>
        <a-popover title="任务详情" trigger="click" :open="clicked" @openChange="handleClickChange" placement="bottomRight">
            <template #content>
                <div>
                    <a-descriptions size="small" :column="1" bordered>
                        <a-descriptions-item class="custom-descriptions-item" label="任务名称">
                            <EditDescriptionsItems
                                :EditDescriptionsItems_indata="{ tag: 'name', value: TaskPopover_indata.task.name }"
                                @save-item="saveChange" />

                        </a-descriptions-item>
                        <a-descriptions-item class="custom-descriptions-item" label="任务状态">
                            <EditStateItem
                                :EditDescriptionsItems_indata="{ tag: 'state', value: TaskPopover_indata.task.state }"
                                @save-item="saveChange" />

                        </a-descriptions-item>

                        <a-descriptions-item v-if="TaskPopover_indata.task.deadline !== ''" class="custom-descriptions-item"
                            label="截止时间">
                            <EditTimeItem
                                :EditDescriptionsItems_indata="{ tag: 'deadline', value: TaskPopover_indata.task.deadline }"
                                @save-item="saveChange" />
                        </a-descriptions-item>

                        <a-descriptions-item class="custom-descriptions-item" label="任务描述">

                            <EditDescriptionsItems
                                :EditDescriptionsItems_indata="{ tag: 'desc', value: TaskPopover_indata.task.desc }"
                                @save-item="saveChange" />

                        </a-descriptions-item>

                        <a-descriptions-item v-if="TaskPopover_indata.task.siyuanlink !=null && TaskPopover_indata.task.siyuanlink.length > 0" class="custom-descriptions-item" label="思源链接">

                            <EditLinkItem
                                :EditLinkItem_indata="{ tag: 'siyuanlink', value: TaskPopover_indata.task.siyuanlink }"
                                @save-item="saveChange" />

                        </a-descriptions-item>

                    </a-descriptions>

                    <a-flex justify="space-between" align="flex-end">
                        <div style="font-size: 10px;">创建时间: {{ TaskPopover_indata.task.createTime }}<br />更新时间:
                            {{ TaskPopover_indata.task.updateTime }} </div>
                        <!-- <a @click="hide">Close</a> -->
                        <el-popconfirm title="你确定要删除吗？" ok-text="Yes" cancel-text="No" @confirm="deleteTask"
                            @cancel="cancel" width="160">
                            <template #reference>
                                <a href="#" style="color:red">Delete</a>
                            </template>

                        </el-popconfirm>
                        <!-- <a @click="deleteTask" style="color:red">Delete</a> -->
                    </a-flex>

                </div>
            </template>

            <div
                :style="{ 'max-width': tableUlWidth + 'px', overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', }">
                {{ TaskPopover_indata.task.name }}
            </div>

        </a-popover>
    </a-popover>
</template>

<script setup>

import { ref, reactive, onMounted, onBeforeUnmount, watchEffect, nextTick } from 'vue';
import EditDescriptionsItems from './EditDescriptionsItems.vue';
import EditStateItem from './EditStateItem.vue';
import EditTimeItem from './EditTimeItem.vue';
import EditLinkItem from './EditLinkItem.vue';

const emits = defineEmits(['save-task', 'delete-task']);
const props = defineProps({
    TaskPopover_indata: {
        task: [],
    },
    tableUlWidth: '',
})
//子组件传父组件
const saveChange = function (value) {
    //判断是哪个要提交
    if (value.tag === "name") {
        props.TaskPopover_indata.task.name = value.value;
    } else if (value.tag === "desc") {
        props.TaskPopover_indata.task.desc = value.value;
    } else if (value.tag === "state") {
        props.TaskPopover_indata.task.state = value.value;
    } else if (value.tag === "deadline") {
        props.TaskPopover_indata.task.deadline = value.value;
    }else if(value.tag === "siyuanlink"){
        props.TaskPopover_indata.task.siyuanlink = value.value;
    }
    emits('save-task', props.TaskPopover_indata.task);
}



// 定义 clicked 和 hovered 为 Map
const clicked = ref(false);
const hovered = ref(false);
const hide = () => {
    clicked.value = false;
    hovered.value = false;
};
const handleHoverChange = visible => {
    clicked.value = false;
    hovered.value = visible;
};
const handleClickChange = visible => {
    clicked.value = visible;
    hovered.value = false;
};

const deleteTask = e => {
    //   console.log(e);
    emits('delete-task', props.TaskPopover_indata.task);
}

const cancel = e => {

};

</script>
   
<style>
.custom-descriptions-item {
    max-width: 30vmax;
    /* text-align: center; */
}
</style>
