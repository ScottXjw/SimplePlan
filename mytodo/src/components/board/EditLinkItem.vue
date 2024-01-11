<template>
  <div>
    <div v-if="editableData">
      <a-select v-model:value="value_edit" mode="multiple" style="width: 100%" placeholder="Select Item..."
        :filter-option="false" @search="searchSql" :options="linkOptions"> </a-select>
      <a @click="save"><el-icon><Select /></el-icon></a>
    </div>
    <div v-else>

      <span v-for="block_id in EditLinkItem_indata.value">

        <a-tooltip v-if="value_title.get(block_id)!=null && value_title.get(block_id).length > 18" :title="value_title.get(block_id)" placement="right">
          <a-tag color="processing">
            <a :href="'siyuan://blocks/' + block_id">
              {{ `${value_title.get(block_id).slice(0, 18)}...` }}
            </a>
          </a-tag>
        </a-tooltip>
        <a-tag v-else color="processing">
          <a :href="'siyuan://blocks/' + block_id">
            {{ value_title.get(block_id) }}
          </a>
        </a-tag>

        <!-- <a-tag color="processing">
          <a :href="'siyuan://blocks/' + block_id" style="">{{ value_title.get(block_id) }}</a></a-tag> -->

      </span>


      <a @click="edit"><el-icon>
          <Edit />
        </el-icon></a>
    </div>
  </div>
</template>

<script setup>

import { ref, watch, reactive, onMounted, onBeforeUpdate } from 'vue';
import { sql } from "../../utils/siyuan-api.js";

const emits = defineEmits(['save-item']);
const props = defineProps({
  EditLinkItem_indata: {
    tag: String,
    value: String,
  }
})



// 编辑
const editableData = ref(false)
const value_edit = ref()
const edit = () => {
  // console.log(props.EditLinkItem_indata.value)
  value_edit.value = props.EditLinkItem_indata.value
  editableData.value = true
}
const save = () => {
  props.EditLinkItem_indata.value = value_edit.value
  editableData.value = false
  updateTitle();
  // //保存就提交
  emits('save-item', props.EditLinkItem_indata)
}


const value_title = ref(new Map())
const updateTitle = async () => {
  for (const key in props.EditLinkItem_indata.value) {
    const element = props.EditLinkItem_indata.value[key];
    // console.log(element)
    const temp = await sql("select (REPLACE(REPLACE(CAST(type AS VARCHAR), 'd', '文档'), 'h', '标题') || '--' || content) as label from blocks where id = '" + element + "'");
    value_title.value.set(element, temp.message.data[0].label)
    // console.log(temp.message.data[0].label)
    // console.log(value_title)
  }
}

onMounted(async () => {
  updateTitle();
});

// link的操作
const linkOptions = ref([]);
//首先搜索好所有的标题
const searchSql = async (inputData) => {
  // console.log(inputData)
  // console.log(taskDemo.siyuanlink)
  const temp = await sql("select (REPLACE(REPLACE(CAST(type AS VARCHAR), 'd', '文档'), 'h', '标题') || '--' || content) as label,id as value from blocks where (type = 'd' or type = 'h') and content LIKE'%" + inputData + "%'");
  //  console.log(temp.message.data)
  linkOptions.value = temp.message.data
  // console.log(linkOptions.value)
}



</script>
   
<style></style>