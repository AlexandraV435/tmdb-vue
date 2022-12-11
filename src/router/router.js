import MainPage from '@/pages/MainPage'
import FilmPage from '@/pages/FilmPage'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: MainPage,
        props: true
    },
    {
        path: '/film/:id',
        component: FilmPage,
        props: true
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;