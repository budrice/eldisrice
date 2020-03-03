<template>
  <section id="education">
    <h1 class="mb-3">Education</h1>
    <b-row v-for="ed in content" :key="ed.id" class="sec mb-5">
      <b-row class="w-100">
        <b-col cols="12" md="6">
          <h3 class="mb-3">{{ ed.title }}</h3>
          <h5 class="mb-3">{{ ed.subheading }}</h5>
        </b-col>
        <b-col cols="12" md="6" class="text-md-right">
          <h5 style="color: orange;">{{ ed.duration }}</h5>
        </b-col>
      </b-row>
      <b-row>
        <ul>
          <li v-for="(icon, i) in ed.icons" :key="i">
            <i :class="icon.class"></i><span>{{ ` ${icon.name}` }}</span>
          </li>
        </ul>
      </b-row>
      <b-row class="p-0">
        <div v-html="ed.html"></div>
      </b-row>
    </b-row>
  </section>
</template>

<script>
export default {
  name: "Education",
  props: {
    content: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      section_class: "resume-section p-3 p-lg-5 d-flex justify-content-center",
      content_class:
        "resume-item d-flex flex-column flex-md-row justify-content-between mb-5"
    }
  },
  created() {
    this.content.forEach(item => {
      item.icons.sort((a, b) => {
        let x = a.class
        let y = b.class
        if (x < y) {
          return -1
        }
        if (x > y) {
          return 1
        }
        return 0
      })
    })
  }
}
</script>

<style scoped>
section#education {
  padding: 95px 15px;
}
h4,
h6 {
  margin: 1.5em 0;
}
</style>
