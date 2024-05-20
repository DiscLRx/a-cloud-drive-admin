<template>
  <a-layout>
    <hr>
    <a-layout-content style="background: #fff; margin: 0 1rem;">
      <a-select style="margin: 0.5rem" v-model:value="logSource">
        <a-select-option value="file_service">文件服务日志</a-select-option>
        <a-select-option value="system_service">系统服务日志</a-select-option>
        <a-select-option value="identity_service">身份服务日志</a-select-option>
      </a-select>
      <a-range-picker style="margin: 0.5rem" v-model:value="dateRange" show-time/>
      <a-button style="margin: 0.5rem" type="primary" @click="getLogs">查询</a-button>
    </a-layout-content>
    <a-layout-content style="background: #fff; margin: 0 1rem;" class="browse-area">
      <a-table :columns="columns" :data-source="logs" :pagination="false" :scroll="{y: tableHeight, x: tableWitdh}"
               :resizable="true" size="small">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'level'">
            <template v-if="text === 'Verbose'">
              <span style="color: #000">Verbose</span>
            </template>
            <template v-else-if="text === 'Debug'">
              <span style="color: #0bb">Debug</span>
            </template>
            <template v-else-if="text === 'Information'">
              <span style="color: #0b0">Information</span>
            </template>
            <template v-else-if="text === 'Warning'">
              <span style="color: #cd0">Warning</span>
            </template>
            <template v-else-if="text === 'Error'">
              <span style="color: #f33">Error</span>
            </template>
            <template v-else-if="text === 'Fatal'">
              <span style="color: #500">Fatal</span>
            </template>
          </template>
        </template>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import arRequest from '/src/script/auto-refresh-request.js'
import {message} from "ant-design-vue";
import dayjs from "dayjs";

const tableHeight = document.body.clientHeight - 300
const tableWitdh = ref(Math.max(document.body.clientHeight, 2000))

const logSource = ref('file_service')
const dateRange = ref([
  dayjs().subtract(1, 'day'),
  dayjs()
])

const columns = reactive([
  {
    title: '时间',
    dataIndex: 'date',
    width: 150
  },
  {
    title: '级别',
    dataIndex: 'level',
    width: 100
  },
  {
    title: '信息',
    dataIndex: 'message',
    width: 500
  },
  {
    title: '跟踪ID',
    dataIndex: 'traceId',
    width: 200
  },
  {
    title: '用户ID',
    dataIndex: 'operatorId',
    width: 100
  },
  {
    title: '异常',
    dataIndex: 'exception',
    width: 250
  }
])

const logs = ref([])

getLogs()

function getLogs() {
  const begin = dateRange.value[0].valueOf()
  const end = dateRange.value[1].valueOf()
  const source = logSource.value
  arRequest(`/api/system/logs?begin=${begin}&end=${end}&source=${source}`, {
    method: 'GET'
  }).then(res => {
    if (res.code === 0) {
      columns[5].width = 250
      tableWitdh.value = Math.max(document.body.clientHeight, 2000)
      logs.value = res.data
          .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf())
          .map(l => {
            if (l.exception !== null) {
              columns[5].width = 2000
              tableWitdh.value = Math.max(document.body.clientHeight, 4000)
            }
            return {
              date: dayjs(l.date).format('YYYY/MM/DD HH:mm:ss.SSS'),
              level: l.level,
              traceId: l.traceId,
              operatorId: l.operatorId,
              message: l.message,
              exception: l.exception
            }
          })

    }
  })
}

</script>

<style scoped>
.browse-area {
  padding: 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.path-breadcrumb * {
  color: rgb(22, 119, 255);
  font-family: "Microsoft YaHei UI", sans-serif;
  font-weight: 500;
}
</style>