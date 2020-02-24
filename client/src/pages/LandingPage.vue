<template>
  <div v-if="viewContent">
    <NavigationBar :name="fullname" :slides="slides" :video="video" />
    <b-container>
      <Home :content="home" />
      <hr class="m-0" />
      <Experiences :content="experiences" />
      <hr class="m-0" />
      <Education :content="education" />
      <hr class="m-0" />
      <Skills :content="skills" />
      <hr class="m-0" />
      <About :content="about" />
    </b-container>
  </div>
</template>

<script>
import { fetchData } from "@/api"
import NavigationBar from "@/components/NavigationBar"
import Home from "@/components/Home"
import Experiences from "@/components/Experiences"
import Education from "@/components/Education"
import Skills from "@/components/Skills"
import About from "@/components/About"

export default {
  name: "LandingPage",
  components: {
    NavigationBar,
    Home,
    Experiences,
    Education,
    Skills,
    About
  },
  data() {
    return {
      viewContent: false,
      results: [],
      home: {},
      experiences: [],
      education: [],
      skills: {},
      about: {},
      all_icons: [],
      slides: []
    }
  },
  computed: {
    fullname() {
      return `${this.home.firstname} ${this.home.lastname}`
    },
    video() {
      return this.home.video
    }
  },
  methods: {
    getPageIcons() {
      this.home.icons = this.all_icons.filter(item => {
        return item.home === 1
      })
      this.education.forEach((item, index) => {
        this.education[index].icons = []
        this.education[index].icons = this.all_icons.filter(icon => {
          return icon.education === item.id
        })
      })
    }
  },
  beforeCreate() {
    fetchData().then(
      res => {
        this.results = res
      },
      err => console.log(err)
    )
  },
  watch: {
    results() {
      this.home = { ...this.results.data[0][0] }
      this.experiences = this.results.data[1].reverse()
      this.education = this.results.data[2]
      this.skills = { ...this.results.data[3][0] }
      this.about = { ...this.results.data[4][0] }
      this.all_icons = this.results.data[5]
      this.slides = this.results.data[6]
      this.viewContent = true
      this.getPageIcons()
    }
  }
}
</script>

<style></style>
