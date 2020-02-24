import Vue from "vue"
import Router from "vue-router"
import LandingPage from "@/pages/LandingPage"
import Admin from "@/pages/Admin"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage
    },
    {
      path: "/home",
      name: "LandingPage",
      component: LandingPage
    },
    {
      path: "/experiences",
      name: "LandingPage",
      component: LandingPage
    },
    {
      path: "/education",
      name: "LandingPage",
      component: LandingPage
    },
    {
      path: "/skills",
      name: "LandingPage",
      component: LandingPage
    },
    {
      path: "/about",
      name: "LandingPage",
      component: LandingPage
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin
    }
  ]
})
