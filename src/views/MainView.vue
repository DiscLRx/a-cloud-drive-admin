<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
        class="sider"
    >
      <div class="logo-area">
        <img src="/src/assets/logo.svg" class="logo">
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <RouterLink to="/main/system">
          <a-menu-item key="1">
            <span class="nav-text">系统设置</span>
          </a-menu-item>
        </RouterLink>
        <RouterLink to="/main/user-manage">
          <a-menu-item key="2">
            <span class="nav-text">用户管理</span>
          </a-menu-item>
        </RouterLink>
        <RouterLink to="/main/file-manage">
          <a-menu-item key="3">
            <span class="nav-text">文件管理</span>
          </a-menu-item>
        </RouterLink>
        <RouterLink to="/main/logs">
          <a-menu-item key="4">
            <span class="nav-text">日志浏览</span>
          </a-menu-item>
        </RouterLink>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header" >
        <a-dropdown placement="bottom">
          <a-button style="margin: 1rem">
            <UserOutlined />{{ displayName }}
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a @click="signOut">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content >
        <RouterView :token="token" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref } from 'vue';
import router from "../router.js";
import {UserOutlined} from "@ant-design/icons-vue";

const token = localStorage.getItem('token')
const displayName = ref(localStorage.getItem('displayName'))

const selectedKeys = ref((()=>{
  switch (location.pathname){
    case '/main/system':
      return ['1']
    case '/main/user-manage':
      return ['2']
    case '/main/file-manage':
      return ['3']
    case '/main/logs':
      return ['4']
    default:
      return []
  }
})());

function signOut() {
  localStorage.clear()
  router.push('/sign-in')
}
</script>
<style scoped>
.logo-area{
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.logo{
  height: 60%;
  margin: 15%;
}

.header {
  background: #fff;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.sider a, a:hover, a:active, a:visited {
  color: white;
}
</style>