import Vue from 'vue'
import VueRouter from 'vue-router'
import Article from '../components/Article'
import PosltList from '../components/PosltList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
            name: 'root',
            path: '/',
            components: {
                main: PosltList
            }
        },
        {
            name: 'post_content',
            path: '/topic/:id&author=:name',
            components: {
                main: Article,
                slidebar: SlideBar
            }
        },
        {
            name: 'user_info',
            path: '/userinfo/:name',
            components: {
                main: UserInfo
            }
        }
    ]
})