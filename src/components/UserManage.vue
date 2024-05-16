<template>
  <a-layout>
    <a-layout-content
        style="background: #fff; margin: 1rem; padding: 1rem">

      <a-table :columns="columns" :data-source="users" :pagination="false" :scroll="{y: tableHeight}" bordered>
        <template #bodyCell="{ column, text : value, record }">
          <template v-if="['username', 'displayName', 'email', 'password' ,'totalSpace'].includes(column.dataIndex)">
            <div>
              <a-input
                  v-if="editableData[record.id]"
                  v-model:value="editableData[record.id][column.dataIndex]"
                  style="margin: -5px 0"/>
              <template v-else>
                <template v-if="column.dataIndex === 'password'">
                  ******
                </template>
                <template v-else>
                  {{ value }}
                </template>
              </template>
            </div>
          </template>
          <template v-if="column.dataIndex === 'role'">
            <div>
              <a-select
                  v-if="editableData[record.id]"
                  v-model:value="editableData[record.id][column.dataIndex]"
                  style="margin: -5px 0; width: 100%">
                <a-select-option value="USER">
                  普通用户
                </a-select-option>
                <a-select-option value="ADMIN">
                  管理员
                </a-select-option>
              </a-select>
              <template v-else>
                {{ value === 'USER' ? '普通用户' : (value === 'ADMIN' ? '管理员' : '') }}
              </template>
            </div>
          </template>
          <template v-if="column.dataIndex === 'enable'">
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
                <a @click="edit(record.id)">编辑</a>
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
    width: '6%',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: '9%',
  },
  {
    title: '昵称',
    dataIndex: 'displayName',
    width: '9%',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '14%',
  },
  {
    title: '密码',
    dataIndex: 'password',
    width: '10%',
  },
  {
    title: '已用容量（字节）',
    dataIndex: 'usedSpace',
    width: '13%',
  },
  {
    title: '总容量（字节）',
    dataIndex: 'totalSpace',
    width: '13%',
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: '11%',
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

const users = ref([]);
const editableData = reactive({});
const edit = id => {
  editableData[id] = clone(users.value.filter(item => item.id === id)[0])
};
const save = async id => {
  if (await updateUser(editableData[id])) {
    const displayUser = users.value.filter(item => id === item.id)[0]
    Object.assign(displayUser, editableData[id]);
    displayUser.password = ''
    delete editableData[id];
  }
};
const cancel = id => {
  delete editableData[id];
};

loadUsers()

async function loadUsers() {
  return arRequest('/api/identity/user', {
    method: 'GET'
  }).then(res => {
    if (res.code === 0) {
      const resUsers = res.data
      resUsers.forEach(u => {
        u.password = ''
      })
      users.value = resUsers
    }
  })
}

async function updateUser(user) {
  return arRequest(`/api/identity/user/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
      displayName: user.displayName,
      email: user.email,
      totalSpace: user.totalSpace,
      role: user.role,
      enable: user.enable
    })
  }).then(res => {
    if (res.code === 0) {
      message.success('修改成功')
      return true
    } else if (res.code === 3000) {
      message.warning('参数格式不正确')
    } else if (res.code === 3001) {
      message.warning('用户名重复')
    } else if (res.code === 3002) {
      message.warning('邮箱重复')
    }
    return false
  })
}
</script>
<style scoped>

</style>