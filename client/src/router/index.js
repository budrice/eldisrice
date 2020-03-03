import Vue from "vue"
import Router from "vue-router"
import LandingPage from "@/pages/LandingPage"
import Contact from "@/pages/Contact"
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
      name: "Home",
      component: LandingPage
    },
    {
      path: "/experiences",
      name: "Experiences",
      component: LandingPage
    },
    {
      path: "/education",
      name: "Education",
      component: LandingPage
    },
    {
      path: "/skills",
      name: "Skills",
      component: LandingPage
    },
    {
      path: "/about",
      name: "About",
      component: LandingPage
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin
    }
  ]
})
