<template>
  <div v-if="viewContent">
    <b-container id="landing-page">
      <Home :content="home" />
      <hr class="m-0" />
      <Experiences :content="experiences" />
      <hr class="m-0" />
      <Education :content="education" />
      <hr class="m-0" />
      <Skills :content="skills" />
      <hr class="m-0" />
      <About :content="about" />
      <hr class="m-0" />
    </b-container>
  </div>
</template>

<script>
import { fetchData } from "@/api"
import Home from "@/components/Home"
import Experiences from "@/components/Experiences"
import Education from "@/components/Education"
import Skills from "@/components/Skills"
import About from "@/components/About"

export default {
  name: "LandingPage",
  components: {
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
      all_icons: []
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
  mounted() {
    try {
      fetchData().then(
        res => {
          this.results = res
          this.viewContent = true
        },
        err => {
          console.log(err)
        }
      )
    } catch (error) {
      console.log(error)
    }
  },
  watch: {
    results() {
      this.home = { ...this.results.data[0][0] }
      this.experiences = this.results.data[1].reverse()
      this.education = this.results.data[2]
      this.skills = { ...this.results.data[3][0] }
      this.about = { ...this.results.data[4][0] }
      this.all_icons = this.results.data[5]
      this.viewContent = true
      this.getPageIcons()
    }
  }
}
</script>

<style>
article {
  text-indent: 2em;
}
.sec {
  padding: 0 15px;
}
</style>
