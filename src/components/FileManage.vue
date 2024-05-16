<template>
  <a-layout>
    <a-layout-content
        style="background: #fff; margin: 1rem; padding: 1rem">

      <a-table :columns="columns" :data-source="files" :pagination="false" :scroll="{y: tableHeight}" bordered>
        <template #bodyCell="{ column, text : value, record }">
          <template v-if="['uploadingLock', 'deleteFlag'].includes(column.dataIndex)">
            <div>
              {{ value ? '是' : '否' }}
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'enable'">
            <div>
              <a-switch
                  v-if="editableData[record.id]"
                  v-model:checked="editableData[record.id][column.dataIndex]"
                  style="margin: -5px 0"/>
              <template v-else>
                {{ value ? '启用' : '停用' }}
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <div>
              <span v-if="editableData[record.id]">
                <a style="margin-right: 0.5rem; white-space: nowrap" @click="save(record.id)">保存</a>
                <a style="white-space: nowrap" @click="cancel(record.id)">取消</a>
              </span>
              <span v-else>
                <a style="margin-right: 0.5rem; white-space: nowrap" @click="download(record.id)">下载</a>
                <a style="white-space: nowrap" @click="edit(record.id)">编辑</a>
              </span>
            </div>
          </template>
        </template>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
import {reactive, ref} from 'vue';
import clone from "/src/script/clone.js";
import arRequest from '/src/script/auto-refresh-request.js'
import {message} from "ant-design-vue";

const tableHeight = document.body.clientHeight - 300

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '14%',
  },
  {
    title: '首部哈希',
    dataIndex: 'headHash',
    width: '24%',
  },
  {
    title: '整体哈希',
    dataIndex: 'entiretyHash',
    width: '24%',
  },
  {
    title: '引用数量',
    dataIndex: 'referenceCount',
    width: '8%',
  },
  {
    title: '大小（字节）',
    dataIndex: 'fileSize',
    width: '13%',
  },
  {
    title: '上传锁定',
    dataIndex: 'uploadingLock',
    width: '3%',
  },
  {
    title: '删除标识',
    dataIndex: 'deleteFlag',
    width: '3%',
  },
  {
    title: '可用性',
    dataIndex: 'enable',
    width: '7%',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '8%',
  },
];

const files = ref([]);
const editableData = reactive({});
const edit = id => {
  editableData[id] = clone(files.value.filter(item => item.id === id)[0])
};
const save = async id => {
  if (await updateFile(editableData[id])) {
    const displayUser = files.value.filter(item => id === item.id)[0]
    Object.assign(displayUser, editableData[id]);
    displayUser.password = ''
    delete editableData[id];
  }
};
const cancel = id => {
  delete editableData[id];
};

loadFiles()

async function loadFiles() {
  return arRequest('/api/file/files', {
    method: 'GET'
  }).then(res => {
    if (res.code === 0) {
      files.value = res.data
    }
  })
}

async function updateFile(file) {
  return arRequest(`/api/file/files/${file.id}/enable?enable=${file.enable}`, {
    method: 'PUT'
  }).then(res => {
    if (res.code === 0) {
      message.success('修改成功')
      return true
    }
    return false
  })
}

async function download(id) {
  const fileLink = await arRequest(`/api/file/download/files/${id}`, {
        method: 'GET'
      }
  ).then(res => {
    if (res.code === 0) {
      return res.data.url
    }
    return null
  })

  if (fileLink !== null) {
    const a = document.createElement('a')
    a.href = fileLink
    a.download = id
    a.click()
  }
}
</script>
<style scoped>

</style>