import Vue from "vue";
import Router from "vue-router";
Vue.use(Router)
const router=new Router({
    mode: "hash",
    routes:[
        {
            path: '/',
            redirect: '/index',
        },
        {
            path:'/index',
            name:'index',
            component:()=>import('@/views/practice')
        },
        {
            path:'/tmq',
            name:'tmq',
            component:()=>import('@/views/tmq')
        },
        {
            path:'/gpt',
            name:'gpt',
            component:()=>import('@/views/gpt')
        },
        {
            path:'/gpt35',
            name:'gpt35',
            component:()=>import('@/views/gpt35')
        },
    ]
})

export default router;
