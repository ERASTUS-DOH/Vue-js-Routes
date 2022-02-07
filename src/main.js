import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router';

import App from './App.vue';
import UsersList from '@/components/users/UsersList';
import TeamsList from '@/components/teams/TeamsList';
import TeamMembers from '@/components/teams/TeamMembers';
import NotFound from '@/components/nav/NotFound';
import UsersFooter from '@/components/users/UsersFooter';
import TeamsFooter from '@/components/teams/TeamsFooter';

const router =  createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/users"
    },
    {
      path: "/users",
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      name: "user-list",
      beforeEnter(to, from, next){
        if(to.name === "user-list"){
          console.log("route guard for users enabled");
          // console.log(to, from);
          next();
        }else{
          console.log("pathname does not match your desired search");
        }
      },
    },
    {
      path: "/teams",
      components: {
        default: TeamsList,
        footer: TeamsFooter
      },
      children: [
        {
          path: ":teamId",
          component: TeamMembers,
          props: true,
          name: "team-members"
        },
      ]
    },
    {path: "/:notfound(.*)", component: NotFound},
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition){
    console.log(to, from, savedPosition);
    if(savedPosition){
      return savedPosition;
    }
    return {top: 0, left: 0 };
  }

});
router.beforeEach((to, from, next)=>{

  // if(to.name === 'team-members'){
  //   console.log("Credential Guard test is at work");
  //   next();
  // }else {
  //   console.log("Credential Guard Denied Access")
  //   next({name: 'team-members', params: {teamId: 't3'}});
  // }
  next();
});
const app = createApp(App);
app.use(router);
app.mount('#app');
