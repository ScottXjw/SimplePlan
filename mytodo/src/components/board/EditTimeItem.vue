<template>
    <div v-if="editableData">
        <el-date-picker v-model="edit_value_desc" type="datetime" placeholder="Pick a Date" :format=dateFormat
            date-format="MMM DD, YYYY" time-format="HH:mm" />
        <a @click="save"><el-icon><Select /></el-icon></a>
    </div>
    <div v-else>
        <div>{{ EditDescriptionsItems_indata.value || "" }}</div>
        <a @click="edit"><el-icon>
                <Edit />
            </el-icon></a>
    </div>
</template>

<script setup >
import { ref, reactive } from 'vue';
import {formatTime} from '../../utils/util.js';

const emits = defineEmits(['save-item']);
const props = defineProps({
    EditDescriptionsItems_indata: {
        tag: String,
        value: String,
    }
})
const dateFormat = 'YYYY/MM/DD HH:mm:ss';

//编辑
const editableData = ref(false)

const edit_value_desc = ref()


const edit = () => {
    // value_desc.value = props.EditDescriptionsItems_indata.value
    editableData.value = true
}

const save = () => {
    props.EditDescriptionsItems_indata.value = formatTime(edit_value_desc.value)
    editableData.value = false
    // console.log(props.EditDescriptionsItems_indata.value)
    //保存就提交
    emits('save-item', props.EditDescriptionsItems_indata)
}


</script>
   
<style></style>