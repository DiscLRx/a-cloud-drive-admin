import {createRouter, createWebHistory} from "vue-router"
import IndexView from "./views/IndexView.vue";
import SignIn from "./components/SignIn.vue";
import MainView from "./views/MainView.vue";
import UserManage from "./components/UserManage.vue";
import FileManage from "./components/FileManage.vue";
import BrowseLog from "./components/BrowseLog.vue";
import SystemConfig from "./components/SystemConfig.vue";
import ForgetPassword from "./components/ForgetPassword.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            meta: {
                auth: false,
            },
            component: IndexView,
            children: [
                {
                    path: "sign-in",
                    meta: {
                        auth: false,
                    },
                    component: SignIn
                },
                {
                    path: "forget",
                    meta: {
                        auth: false,
                    },
                    component: ForgetPassword
                }
            ]
        },
        {
            path: '/main',
            meta: {
                auth: true
            },
            component: MainView,
            children: [
                {
                    path: 'system',
                    meta: {
                        auth: true
                    },
                    component: SystemConfig,
                },
                {
                    path: 'user-manage',
                    meta: {
                        auth: true
                    },
                    component: UserManage,
                },
                {
                    path: 'file-manage',
                    meta: {
                        auth: true
                    },
                    component: FileManage,
                },
                {
                    path: 'logs',
                    meta: {
                        auth: true
                    },
                    component: BrowseLog,
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const hasToken = localStorage.getItem("token") !== null
    if (to.meta.auth && !hasToken) {
        next("/sign-in")
    } else {
        if (to.path === "/") {
            next("/sign-in")
        } else {
            next()
        }
    }
})

export default router;