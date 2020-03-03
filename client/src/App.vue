<template>
  <main>
    <div v-if="viewContent">
      <div>
        <slide-show :slides="view[1]" :video="view[0][0].video"></slide-show>
      </div>
      <navigation-bar :name="fullname"></navigation-bar>
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import { fetchHeader } from "@/api"
import SlideShow from "@/components/SlideShow"
import NavigationBar from "@/components/NavigationBar"

export default {
  name: "App",
  components: {
    SlideShow,
    NavigationBar
  },
  data() {
    return {
      viewContent: false,
      content: [],
      view: []
    }
  },
  computed: {
    fullname() {
      return `${this.content[0][0].firstname} ${this.content[0][0].lastname}`
    }
  },
  watch: {
    content: {
      handler: function(val) {
        this.view = val
        this.viewContent = true
      }
    }
  },
  methods: {
    requestData() {
      fetchHeader().then(
        res => {
          this.content = res.data
          if (res.data && res.data.length > 0) {
            this.$nextTick(function() {
              this.viewContent = true
            })
          }
        },
        err => console.log(err)
      )
    }
  },
  beforeMount() {
    this.requestData()
  }
}
</script>

<style>
main {
  background-color: rgba(0, 123, 255, 0.15);
}
article {
  text-indent: 2em;
}
.sec {
  padding: 0 15px;
}
</style>
