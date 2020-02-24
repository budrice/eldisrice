<template>
  <div>
    <div v-if="$route.name !== 'Admin'">
      <slide-show :slides="slides"></slide-show>
    </div>
    <b-navbar
      toggleable="lg"
      type="dark"
      class="nav-style"
      :class="positions[1] >= 100 ? 'big-nav-collapse' : 'big-nav'"
    >
      <b-navbar-brand href="/">{{ name }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <div v-if="$route.name === 'LandingPage'">
            <b-nav-item-dropdown text="Landing Page" right>
              <b-dropdown-item href="/"><em>top of page</em></b-dropdown-item>
              <b-dropdown-item href="#experiences">Experience</b-dropdown-item>
              <b-dropdown-item href="#education">Education</b-dropdown-item>
              <b-dropdown-item href="#skills">Skills</b-dropdown-item>
              <b-dropdown-item href="#about">About</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <div v-else>
            <b-nav-item to="/">Landing Page</b-nav-item>
          </div>
          <div v-for="(route, i) in routes" :key="i">
            <div v-if="route.name !== 'LandingPage' && route.name !== 'Admin'">
              <div v-if="$route.name === route.name">
                <b-nav-item
                  :href="`#${route.name.toLowerCase().replace(' ', '_')}`"
                  >{{ route.name }}</b-nav-item
                >
              </div>
              <div v-else>
                <b-nav-item :to="route.path">{{ route.name }}</b-nav-item>
              </div>
            </div>
          </div>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>editor</em>
            </template>
            <b-dropdown-item to="/admin">Admin</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import windowScrollPosition from "@/plugins/window-scroll-position"
import SlideShow from "@/components/SlideShow"

export default {
  name: "NavigationBar",
  mixins: [windowScrollPosition("positions")],
  props: {
    name: {
      type: String,
      required: true
    },
    slides: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            id: 1,
            imagename: "img-1.png"
          }
        ]
      }
    }
  },
  components: {
    SlideShow
  },
  data() {
    return {
      routes: this.$router.options.routes
    }
  }
}
</script>

<style scoped lang="scss">
.navbar {
  align-items: flex-end !important;
}
.nav-style {
  background-image: linear-gradient(180deg, #674dff, #5334ff);
}
.big-nav {
  z-index: 99999;
  position: fixed;
  top: 380px;
  left: 0;
  width: 100%;
  &-collapse {
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
