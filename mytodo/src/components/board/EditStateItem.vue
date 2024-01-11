<template>

    <div v-if="editableData">
        <a-select v-model:value="value_desc" style="width: 200px" :options="options"></a-select>
        <!-- <a-divider type="vertical" style="height: 60px; background-color: #7cb305" /> -->
        <a @click="save"><el-icon><Select /></el-icon></a>
    </div>
    <div v-else>
        <a-badge status="processing" :color="TaskStateColorMap.get(EditDescriptionsItems_indata.value)" :text=value_desc />
        <!-- <a-divider type="vertical" style="height: 60px; background-color: #7cb305" /> -->
        <a @click="edit"><el-icon><Edit /></el-icon></a>
    </div>


</template>

<script setup>
import { ref, reactive } from 'vue';
import { TaskStateColorMap } from "../../utils/util.js";

const emits = defineEmits(['save-item']);
const props = defineProps({
    EditDescriptionsItems_indata: {
        tag:String,
        value: String,
    }
})

const value1 = ref(props.EditDescriptionsItems_indata.value)

const options = ref([
  {
    value: 'todo',
    label: 'todo',
  },
  {
    value: 'doing',
    label: 'doing',
  },
  {
    value: 'done',
    label: 'done',
  },
]);

//编辑
const editableData = ref(false)
const value_desc = ref(props.EditDescriptionsItems_indata.value)
const edit = () => {
    value_desc.value = props.EditDescriptionsItems_indata.value
    editableData.value = true
}
const save = () => {
    props.EditDescriptionsItems_indata.value = value_desc.value
    editableData.value = false
    //保存就提交
    emits('save-item', props.EditDescriptionsItems_indata)
}


</script>
   
<style></style>