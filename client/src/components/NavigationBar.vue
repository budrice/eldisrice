<template>
  <div>
    <b-navbar
      toggleable="xl"
      type="dark"
      class="nav-style"
      :class="positions[1] >= 100 ? 'big-nav-collapse' : 'big-nav'"
    >
      <b-navbar-brand to="/" @click="clicked(`home`)">{{
        name
      }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            href="#home"
            @click="clicked(`home`)"
            :active="main_nav.id === 'home'"
            v-show="main_nav.scroll_nav"
            >top of page</b-nav-item
          >
          <b-nav-item
            href="#experiences"
            @click="clicked(`experiences`)"
            :active="main_nav.id === 'experiences'"
            v-show="main_nav.scroll_nav"
            >Experience</b-nav-item
          >
          <b-nav-item
            href="#education"
            @click="clicked(`education`)"
            :active="main_nav.id === 'education'"
            v-show="main_nav.scroll_nav"
            >Education</b-nav-item
          >
          <b-nav-item
            href="#skills"
            @click="clicked(`skills`)"
            :active="main_nav.id === 'skills'"
            v-show="main_nav.scroll_nav"
            >Skills</b-nav-item
          >
          <b-nav-item
            href="#about"
            @click="clicked(`about`)"
            :active="main_nav.id === 'about'"
            v-show="main_nav.scroll_nav"
            >About</b-nav-item
          >
          <b-nav-item
            to="/"
            @click="clicked(`home`)"
            v-show="!main_nav.scroll_nav"
            ><i class=""></i>&nbsp;Resume</b-nav-item
          >
          <b-nav-item
            to="/contact"
            @click="clicked(`contact`)"
            :active="main_nav.id === 'contact'"
            ><i class=""></i>&nbsp;Contact</b-nav-item
          >
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <b-button class="orange" @click="fetchFile()"
              >download resume</b-button
            >
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import windowScrollPosition from "@/plugins/window-scroll-position"
import { getFile } from "@/api"

export default {
  name: "NavigationBar",
  mixins: [windowScrollPosition("positions")],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      main_nav: { id: "home", scroll_nav: true },
      dom_home: { active: true },
      dom_experiences: {},
      dom_education: {},
      dom_skills: {},
      dom_about: {},
      contact: {}
    }
  },
  methods: {
    fetchFile() {
      getFile()
    },
    clicked(id) {
      let pid = this.getPageId() || "home"
      this.main_nav.id = id
      this.main_nav.scroll_nav = pid === "home" ? true : false
    },
    getPageId() {
      let pid = null
      pid = document.getElementById("home") ? "home" : pid
      pid = document.getElementById("experiences") ? "home" : pid
      pid = document.getElementById("education") ? "home" : pid
      pid = document.getElementById("skills") ? "home" : pid
      pid = document.getElementById("about") ? "home" : pid
      pid = document.getElementById("contact") ? "contact" : pid
      return pid
    },
    setHomeScrollActive() {
      this.dom_home = document.getElementById("home").getBoundingClientRect()
      this.dom_experiences = document
        .getElementById("experiences")
        .getBoundingClientRect()
      this.dom_education = document
        .getElementById("education")
        .getBoundingClientRect()
      this.dom_skills = document
        .getElementById("skills")
        .getBoundingClientRect()
      this.dom_about = document.getElementById("about").getBoundingClientRect()
      if (
        this.dom_home.top <= 475 &&
        this.dom_home.top > 75 - this.dom_home.height
      ) {
        this.main_nav.id = "home"
      } else if (
        this.dom_experiences.top <= 75 &&
        this.dom_experiences.top > 75 - this.dom_experiences.height
      ) {
        this.main_nav.id = "experiences"
      } else if (
        this.dom_education.top <= 75 &&
        this.dom_education.top > 75 - this.dom_education.height
      ) {
        this.main_nav.id = "education"
      } else if (
        this.dom_skills.top <= 75 &&
        this.dom_skills.top > 75 - this.dom_skills.height
      ) {
        this.main_nav.id = "skills"
      } else if (
        this.dom_about.top <= 75 &&
        this.dom_about.top > 75 - this.dom_about.height
      ) {
        this.main_nav.id = "about"
      }
    }
  },
  watch: {
    positions: {
      handler() {
        if (document.getElementById("home")) {
          this.setHomeScrollActive()
        }
      }
    }
  },
  mounted() {
    let id = this.getPageId() || "home"
    this.main_nav.scroll_nav = id === "home"
    this.$nextTick(() => this.clicked(id))
  }
}
</script>

<style scoped lang="scss">
$white: rgb(255, 255, 255);
$orange: rgb(255, 180, 0);
$l-orange: rgb(255, 180, 50);
$t-shade: 1px 1px 1px rgba(0, 0, 0, 0.85);
$t-up-shade: 4px 4px 3px rgba(50, 50, 50, 0.75);
$primary-blue: rgb(0, 123, 255);
.orange {
  color: $orange;
  background-image: linear-gradient(
    180deg,
    rgba(0, 123, 255, 0.7),
    $primary-blue
  ) !important;
  background-color: $white;
}
.navbar {
  align-items: flex-end !important;
}
nav.navbar {
  border-top: 1px solid rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.45);
  background-image: linear-gradient(
    180deg,
    rgba(0, 123, 255, 0.7),
    $primary-blue
  ) !important;
  background-color: $white;
  box-shadow: 0 4px 8px rgba(2px, 0, 4px, 0.45);
}
.navbar-dark .navbar-brand {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 1.6em;
  font-weight: 600;
  margin: 0 1em 0 2.5em;
  color: $l-orange;
  text-shadow: $t-shade;
  &:visited {
    color: $l-orange;
    text-shadow: $t-shade;
  }
  &:hover {
    color: $white;
    text-shadow: $t-shade;
  }
  &.active {
    color: $white;
    text-shadow: $t-shade;
  }
  &:active {
    color: $white;
    text-shadow: $t-shade;
  }
}
.navbar-dark .navbar-nav .nav-link,
.navbar-dark .navbar-nav .nav-link em {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 1.3em;
  margin-right: 1em;
  color: $l-orange;
  text-shadow: $t-shade;
  &:visited {
    color: $l-orange;
    text-shadow: $t-shade;
  }
  &:hover {
    color: $white;
    text-shadow: $t-shade;
  }
  &.active {
    color: $white;
    text-shadow: $t-shade;
  }
  &:active {
    color: $white;
    text-shadow: $t-shade;
  }
}
.big-nav {
  z-index: 99999;
  position: fixed;
  top: 370px;
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
