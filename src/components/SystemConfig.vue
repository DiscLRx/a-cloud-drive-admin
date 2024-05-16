<template>
  <a-layout>
    <a-layout-content
        style="background: #fff; margin: 1rem; padding: 3rem 0; display: flex; justify-content: center; align-items: center">

      <a-descriptions bordered :column="1" style="width: 50rem" :labelStyle="{width: '14rem', textAlign: 'center'}">
        <a-descriptions-item label="SMTP主机名">
          <div class="edit-line" v-if="editStatus.smtpServerHost.showEdit">
            <a-input v-model:value="editStatus.smtpServerHost.value" :style="{width: '15rem'}"/>
            <div class="edit-end">
              <a-button type="primary" @click="saveConfig('smtpServerHost')">保存</a-button>
              <a-button type="default"
                        @click="editStatus.smtpServerHost.showEdit = false; editStatus.emailPassword.value = config['smtpServerHost']">
                取消
              </a-button>
            </div>
          </div>
          <div class="edit-line" v-else>
            <span v-if="config['smtpServerHost']">{{ config['smtpServerHost'] }}</span>
            <span v-else>加载中...</span>
            <a-button type="default" @click="editStatus.smtpServerHost.showEdit = true">编辑</a-button>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="SMTP端口">
          <div class="edit-line" v-if="editStatus.smtpServerPort.showEdit">
            <a-input v-model:value="editStatus.smtpServerPort.value" :style="{width: '15rem'}"/>
            <div class="edit-end">
              <a-button type="primary" @click="saveConfig('smtpServerPort')">保存</a-button>
              <a-button type="default"
                        @click="editStatus.smtpServerPort.showEdit = false; editStatus.smtpServerPort.value = config['smtpServerPort']">
                取消
              </a-button>
            </div>
          </div>
          <div class="edit-line" v-else>
            <span v-if="config['smtpServerPort']">{{ config['smtpServerPort'] }}</span>
            <span v-else>加载中...</span>
            <a-button type="default" @click="editStatus.smtpServerPort.showEdit = true">编辑</a-button>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="邮件推送账号">
          <div class="edit-line" v-if="editStatus.emailAccount.showEdit">
            <a-input v-model:value="editStatus.emailAccount.value" :style="{width: '15rem'}"/>
            <div class="edit-end">
              <a-button type="primary" @click="saveConfig('emailAccount')">保存
              </a-button>
              <a-button type="default"
                        @click="editStatus.emailAccount.showEdit = false; editStatus.emailAccount.value = config['emailAccount']">
                取消
              </a-button>
            </div>
          </div>
          <div class="edit-line" v-else>
            <span v-if="config['emailAccount']">{{ config['emailAccount'] }}</span>
            <span v-else>加载中...</span>
            <a-button type="default" @click="editStatus.emailAccount.showEdit = true">编辑</a-button>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="邮件推送密码">
          <div class="edit-line" v-if="editStatus.emailPassword.showEdit">
            <a-input v-model:value="editStatus.emailPassword.value" :style="{width: '15rem'}"/>
            <div class="edit-end">
              <a-button type="primary" @click="saveConfig('emailPassword')">保存</a-button>
              <a-button type="default"
                        @click="editStatus.emailPassword.showEdit = false; editStatus.emailPassword.value = ''">
                取消
              </a-button>
            </div>
          </div>
          <div class="edit-line" v-else>
            <span>******</span>
            <a-button type="default" @click="editStatus.emailPassword.showEdit = true">编辑</a-button>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="令牌有效期（秒）">
          <div class="edit-line" v-if="editStatus.tokenExpireSeconds.showEdit">
            <a-input v-model:value="editStatus.tokenExpireSeconds.value" :style="{width: '15rem'}"/>
            <div class="edit-end">
              <a-button type="primary" @click="saveConfig('tokenExpireSeconds')">保存</a-button>
              <a-button type="default"
                        @click="editStatus.tokenExpireSeconds.showEdit = false; editStatus.tokenExpireSeconds.value = config['tokenExpireSeconds']">
                取消
              </a-button>
            </div>
          </div>
          <div class="edit-line" v-else>
            <span v-if="config['tokenExpireSeconds']">{{ config['tokenExpireSeconds'] }}</span>
            <span v-else>加载中...</span>
            <a-button type="default" @click="editStatus.tokenExpireSeconds.showEdit = true">编辑</a-button>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="令牌刷新时限（秒）">
          <div class="edit-line" v-if="editStatus.tokenRefreshSeconds.showEdit">
            <a-input v-model:value="editStatus.tokenRefreshSeconds.value" :style="{width: '15rem'}"/>
            <div class="edit-end">
              <a-button type="primary" @click="saveConfig('tokenRefreshSeconds')">保存</a-button>
              <a-button type="default"
                        @click="editStatus.tokenRefreshSeconds.showEdit = false; editStatus.tokenRefreshSeconds.value = config['tokenRefreshSeconds']">
                取消
              </a-button>
            </div>
          </div>
          <div class="edit-line" v-else>
            <span v-if="config['tokenRefreshSeconds']">{{ config['tokenRefreshSeconds'] }}</span>
            <span v-else>加载中...</span>
            <a-button type="default" @click="editStatus.tokenRefreshSeconds.showEdit = true">编辑</a-button>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="验证码有效期（秒）">
          <div class="edit-line" v-if="editStatus.verificationCodeExpireSeconds.showEdit">
            <a-input v-model:value="editStatus.verificationCodeExpireSeconds.value" :style="{width: '15rem'}"/>
            <div class="edit-end">
              <a-button type="primary" @click="saveConfig('verificationCodeExpireSeconds')">保存</a-button>
              <a-button type="default"
                        @click="editStatus.verificationCodeExpireSeconds.showEdit = false; editStatus.verificationCodeExpireSeconds.value = config['verificationCodeExpireSeconds']">
                取消
              </a-button>
            </div>
          </div>
          <div class="edit-line" v-else>
            <span v-if="config['verificationCodeExpireSeconds']">{{ config['verificationCodeExpireSeconds'] }}</span>
            <span v-else>加载中...</span>
            <a-button type="default" @click="editStatus.verificationCodeExpireSeconds.showEdit = true">编辑</a-button>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="用户默认存储容量（字节）">
          <div class="edit-line" v-if="editStatus.userDefaultSpace.showEdit">
            <a-input v-model:value="editStatus.userDefaultSpace.value" :style="{width: '15rem'}"/>
            <div class="edit-end">
              <a-button type="primary" @click="saveConfig('userDefaultSpace')">保存</a-button>
              <a-button type="default"
                        @click="editStatus.userDefaultSpace.showEdit = false; editStatus.userDefaultSpace.value = config['userDefaultSpace']">
                取消
              </a-button>
            </div>
          </div>
          <div class="edit-line" v-else>
            <span v-if="config['userDefaultSpace']">{{ config['userDefaultSpace'] }}</span>
            <span v-else>加载中...</span>
            <a-button type="default" @click="editStatus.userDefaultSpace.showEdit = true">编辑</a-button>
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </a-layout-content>
  </a-layout>
</template>

<script setup>

import {reactive, ref} from "vue";
import arRequest from '/src/script/auto-refresh-request.js'
import {message} from "ant-design-vue";

const config = ref({})

const editStatus = reactive({
  emailAccount: {showEdit: false, value: ''},
  emailPassword: {showEdit: false, value: ''},
  smtpServerHost: {showEdit: false, value: ''},
  smtpServerPort: {showEdit: false, value: ''},
  tokenExpireSeconds: {showEdit: false, value: ''},
  tokenRefreshSeconds: {showEdit: false, value: ''},
  userDefaultSpace: {showEdit: false, value: ''},
  verificationCodeExpireSeconds: {showEdit: false, value: ''}
})

loadConfig().then(() => {
  editStatus.emailAccount.value = config.value['emailAccount']
  editStatus.emailPassword.value = config.value['emailPassword']
  editStatus.smtpServerHost.value = config.value['smtpServerHost']
  editStatus.smtpServerPort.value = config.value['smtpServerPort']
  editStatus.tokenExpireSeconds.value = config.value['tokenExpireSeconds']
  editStatus.tokenRefreshSeconds.value = config.value['tokenRefreshSeconds']
  editStatus.userDefaultSpace.value = config.value['userDefaultSpace']
  editStatus.verificationCodeExpireSeconds.value = config.value['verificationCodeExpireSeconds']
})

async function loadConfig() {
  return arRequest('/api/system/sysconfig', {
    method: 'GET'
  }).then(res => {
    if (res.code === 0) {
      config.value = res.data
    } else {
      throw new Error()
    }
  })
}

function capitalize(str) {
  if (str.length === 0) {
    return
  }
  const first = str[0].toUpperCase()
  return first + str.slice(1, str.length)
}

function saveConfig(key) {
  arRequest(`/api/system/sysconfig/${capitalize(key)}?value=${editStatus[key].value}`, {
    method: 'PUT'
  }).then(res => {
    if (res.code === 0) {
      message.success('修改成功')
      config.value['key'] = editStatus[key].value
      editStatus[key].showEdit = false
      loadConfig()
    } else if (res.code === 3000) {
      message.warning('参数不合法')
    }
  })
}

</script>

<style scoped>
.edit-line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.edit-end {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 9rem;
}
</style>