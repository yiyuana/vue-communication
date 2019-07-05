import Vue from 'vue'
import VueRouter from 'vue-router';

const routes = [
    { 
        path: '/',
        redirect: '/prop' 
    },
    { 
        path: '/prop',
        component: () => import('@/views/prop/Father.vue') 
    },
    { 
        path: '/emit',
        component: () => import('@/views/emit/Father.vue') 
    },
    { 
        path: '/sync',
        component: () => import('@/views/sync/Father.vue') 
    },
    { 
        path: '/model',
        component: () => import('@/views/model/Father.vue') 
    },
    { 
        path: '/attrs',
        component: () => import('@/views/attrs/One.vue') 
    },
    { 
        path: '/provide-inject',
        component: () => import('@/views/provide-inject/One.vue') 
    },
    { 
        path: '/parent',
        component: () => import('@/views/parent/Father.vue') 
    },
    { 
        path: '/eventBus',
        component: () => import('@/views/eventBus/Father.vue') 
    },
    { 
        path: '/root',
        component: () => import('@/views/root/Father.vue') 
    },
    { 
        path: '/mixins',
        component: () => import('@/views/mixins/one.vue') 
    },
    { 
        path: '/vuex',
        component: () => import('@/views/vuex/Father.vue') 
    }
    ]

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

export default router