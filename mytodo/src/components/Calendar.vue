<template>
  <a-calendar v-model:value="value" :locale="locale" >
    <template #dateCellRender="{ current }">
      <ul ref="ulElement" class="events" >
        <li v-for="item in getListData(current)" :key="item.id" >

          <a-popover trigger="hover" placement="right">
            <template #content>
              <a-descriptions size="small" :column="1" bordered>
                <a-descriptions-item class="custom-calendar-descriptions-item" label="任务名称">
                  {{ item.name }}

                </a-descriptions-item>
                <a-descriptions-item class="custom-calendar-descriptions-item" label="任务状态">
                  {{ item.state }}
                </a-descriptions-item>

                <a-descriptions-item v-if="item.deadline !== ''" class="custom-calendar-descriptions-item" label="截止时间">
                  {{ item.deadline }}
                </a-descriptions-item>

                <a-descriptions-item class="custom-calendar-descriptions-item" label="任务描述">
                  {{ item.desc }}
                </a-descriptions-item>


                <a-descriptions-item v-if="item.siyuanlink != null && item.siyuanlink.length > 0"
                  class="custom-calendar-descriptions-item" label="思源链接">

                  <div v-for="block_id in item.siyuanlink">
                    <!-- <a-tag color="processing">
                      <a :href="'siyuan://blocks/' + block_id" style="">
                        {{ value_title.get(block_id).length >
                          40 ? value_title.get(block_id).slice(0, 40) + '...' : value_title.get(block_id) }}
                      </a>
                    </a-tag> -->

                    <a-tooltip v-if="value_title.get(block_id) != null && value_title.get(block_id).length > 15"
                      :title="value_title.get(block_id)" placement="right">
                      <a-tag color="processing">
                        <a :href="'siyuan://blocks/' + block_id">
                          {{ `${value_title.get(block_id).slice(0, 15)}...` }}
                        </a>
                      </a-tag>
                    </a-tooltip>
                    <a-tag v-else color="processing">
                      <a :href="'siyuan://blocks/' + block_id">
                        {{ value_title.get(block_id) }}
                      </a>
                    </a-tag>


                  </div>
                </a-descriptions-item>

              </a-descriptions>
              <div style="font-size: 10px;">创建时间: {{ item.createTime }}<br />更新时间:
                {{ item.updateTime }} </div>
            </template>
            <div class="todo-text1"
              :style="{ width: state.ulWidth, overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', color: TaskStateColorMap.get(item.state) }">
              {{ item.name }}</div>
          </a-popover>
        </li>
      </ul>
    </template>

    <template #monthCellRender="{ current }">
      <a-flex justify="space-evenly" align="center" >
        <div v-for="item in getMonthData(current)" >
          <a-tag style="text-align: center;" :color="TaskStateColorMap.get(item[0])">{{ item[0] }}</a-tag>
          <a-statistic style="text-align: center;" :value="item[1]" >
          </a-statistic>
        </div>
      </a-flex>
    </template>


  </a-calendar>
</template>
     
    
<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
// import type { CalendarDateType, CalendarInstance } from 'element-plus'
import { TaskStateColorMap } from "../utils/util.js";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { sql } from "../utils/siyuan-api.js";

const locale = ref({
  lang: {
    locale: "zh-cn",
    month: '月',
    year: '年',
  },
});

const props = defineProps({
  appTasks: {},
})

const value = ref();

const getListData = value => {
  let listData = new Array();
  props.appTasks.forEach(
    (item) => item.forEach(
      (item1) => {
        //判断item的时间和value的天是否相同
        // console.log(value.date(),value.format("DD/MM/YYYY"))
        if (dayjs(item1.createTime).format("DD/MM/YYYY") == value.format("DD/MM/YYYY")) {
          listData.push(item1);
        }
      }
    )
  )
  // console.log(listData);
  return listData || [];
}

const getMonthData = value => {
  let listData = new Map();
  listData.set("todo", 0);
  listData.set("doing", 0);
  listData.set("done", 0);
  props.appTasks.forEach(
    (item) => {

      item.forEach(
        (item1) => {
          //判断item的时间和value的天是否相同
          // console.log(value.date(),value.format("DD/MM/YYYY"))
          if (dayjs(item1.createTime).format("MM/YYYY") == value.format("MM/YYYY")) {
            listData.set(item1.state, listData.get(item1.state) + 1);
          }
        }
      )
    }
  )
  // console.log(listData);
  return listData || [];

}




const ulElement = ref(null);
const state = reactive({
  ulWidth: "300px",
});


const value_title = ref(new Map())
const updateTitle = async () => {

  props.appTasks.forEach(
    (item) => {
      item.forEach(
        (item1) => {

          //根据siyuanlink获取到title
          item1.siyuanlink.forEach(async element_id => {
            if (!value_title.value.hasOwnProperty(element_id)) {
              const temp = await sql("select (REPLACE(REPLACE(CAST(type AS VARCHAR), 'd', '文档'), 'h', '标题') || '--' || content) as label from blocks where id = '" + element_id + "'");
              value_title.value.set(element_id, temp.message.data[0].label)
            }
          });

        }
      )
    }
  )

}

onMounted(() => {
  window.addEventListener('resize', handleResize1);
  state.ulWidth = (ulElement.value.clientWidth - 17) + "px"
  updateTitle();
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize1);
});
const handleResize1 = function () {
  // console.log( ulElement.value.clientWidth)
  state.ulWidth = (ulElement.value.clientWidth - 17) + "px"
  // console.log(boxStyle.width)
}



</script>
     
<style>
.todo-text1:hover {
  color: blue;
  /* 鼠标悬停时的颜色 */
}

.events {
  list-style: none;
  margin: 0;
  padding: 0;
}

.custom-calendar-descriptions-item {
  max-width: 20vmax;
  /* text-align: center; */
}

</style>
    
    