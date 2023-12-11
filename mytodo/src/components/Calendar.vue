<template>
  <el-config-provider :locale="locale">
    <el-calendar ref="calendar" v-model="selectedDate">
      <template #header="{ date }">
        <span>
          <el-date-picker v-model="selectedDate" type="month" placeholder="Pick a month" format="YYYY年MM月" />
        </span>

        <el-button-group style="align-items: center;">
          <el-button @click="selectDate('prev-month')">
            上个月
          </el-button>
          <el-button @click="selectDate('today')">今天</el-button>
          <el-button @click="selectDate('next-month')">
            下个月
          </el-button>
        </el-button-group>
      </template>

      <template style="padding: 1px;" #date-cell="{ data }">

        <el-container>
          <el-aside width="1.3rem">{{ new Date(data.day).getDate() }}</el-aside>

          <el-main style="padding: 0px;
                                      max-height: 4.5rem;
                                      max-width: 15rem;">
            <el-scrollbar>
              <div v-for="[state, tasksList] of tasks">
                <div v-for="task in tasksList">

                  <el-row v-if="isSameDay(task.createTime, data.date)" style="margin-left: 0px;margin-right: 0px "
                    :gutter="10">

                    <el-popover placement="left" title="任务详情" :width="350" trigger="hover">

                      <el-descriptions :column=1 :colon="false">
                        <el-descriptions-item label="任务名称">
                          <span v-if="!task.boardSet.isEditingContent">{{ task.name }}</span>
                          <el-input v-else v-model="task.boardSet.editedTask.name" @input="$forceUpdate()" type="text"
                            placeholder="请输入文本"></el-input>
                        </el-descriptions-item>
                        <el-descriptions-item label="任务状态">

                          <span v-if="!task.boardSet.isEditingContent">{{ task.state }}</span>
                          <el-select v-else v-model="task.boardSet.editedTask.state" @change="$forceUpdate()">
                            <el-option label="todo" value="todo"></el-option>
                            <el-option label="doing" value="doing"></el-option>
                            <el-option label="done" value="done"></el-option>
                          </el-select>
                        </el-descriptions-item>

                        <el-descriptions-item label="创建时间">{{ formatTime(task.createTime) }}</el-descriptions-item>
                        <el-descriptions-item label="更新时间">{{ formatTime(task.updateTime) }}</el-descriptions-item>

                        <el-descriptions-item v-if="task.deadline != ''" label="截止时间">
                          <span v-if="!task.boardSet.isEditingContent">{{ formatTime(task.deadline) }}</span>
                          <div v-else class="block">
                            <el-date-picker v-model="task.boardSet.editedTask.deadline" type="datetime"
                              @input="$forceUpdate()" placeholder="选择日期时间">
                            </el-date-picker>
                          </div>
                        </el-descriptions-item>

                        <el-descriptions-item label="任务描述">
                          <span v-if="!task.boardSet.isEditingContent">{{ task.desc }}</span>
                          <el-input v-else type="textarea" placeholder="请输入文本" v-model="task.boardSet.editedTask.desc"
                            :autosize="{ minRows: 4, maxRows: 7 }" @input="$forceUpdate()"></el-input>
                        </el-descriptions-item>
                      </el-descriptions>
                      <template #reference>
                        <el-button class="ellipsis-tag" type="info" plain>
                          {{ task.name }}
                        </el-button>
                      </template>
                    </el-popover>
                  </el-row>
                </div>
              </div>
            </el-scrollbar>
          </el-main>


        </el-container>


      </template>


    </el-calendar>
  </el-config-provider>
</template>
     
    
<script lang="ts">
import { ref } from 'vue'
import type { CalendarDateType, CalendarInstance } from 'element-plus'
import { modifyTask, formatTime } from "../utils/util.js";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'



export default {
  props: ['appTasks'],
  setup(props, context) {
    const calendar = ref<CalendarInstance>()
    const selectDate = (val: CalendarDateType) => {
      if (!calendar.value) return
      calendar.value.selectDate(val)
    }
    const selectedDate = ref<Date | null>(new Date()); // 这里可以是你想要显示的固定月份

    return {
      calendar,
      selectDate,
      locale: zhCn,
      selectedDate,
      tasks: props.appTasks, // 父组件传给子组件的值
    }
  },
  data() {
    return {

    }
  },
  methods: {
    isSameDay(date1String, date2) {
      const date1 = new Date(date1String)
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      )
    },
    formatTime,
  }
}
</script>
     
<style>
.ellipsis-tag {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  /* 显示省略号 */
  width: 15rem;
  /* 设置最大宽度，根据需要调整 */
  padding: 1rem;
  max-height: 1.5rem;
}
</style>
    
    