<template>


    <!-- <a-typography-paragraph v-model:content="value_desc" editable /> -->
    <div>
    <div v-if="editableData" >
      <a-textarea v-model:value="value_desc"  :auto-size="{ minRows: 1, maxRows: 5 }" />
      <a @click="save"><el-icon><Select /></el-icon></a>
    </div>
    <div v-else >
      <div>{{ EditDescriptionsItems_indata.value || "" }}</div>
      <a @click="edit"><el-icon><Edit /></el-icon></a>
    </div>
  </div>

</template>

<script setup>

import { ref,watch , reactive } from 'vue';

const emits = defineEmits(['save-item']);
const props = defineProps({
    EditDescriptionsItems_indata: {
        tag:String,
        value: String,
    }
})



// 编辑
const editableData = ref(false)
const value_desc = ref("")
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
   
<style>

</style>