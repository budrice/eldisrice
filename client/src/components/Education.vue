<template>
  <section id="education" :class="section_class">
    <div class="w-100 mt-5">
      <h2 class="mb-5">Education</h2>
      <div v-for="ed in content" :key="ed.id" :class="content_class">
        <div class="resume-content">
          <h3 class="mb-0">{{ ed.title }}</h3>
          <div class="subheading mb-3">{{ ed.subheading }}</div>
          <ul>
            <li v-for="(icon, i) in ed.icons" :key="i">
              <i :class="icon.class"></i><span>{{ ` ${icon.name}` }}</span>
            </li>
          </ul>
          <p v-html="ed.html"></p>
        </div>
        <div class="resume-date text-md-right">
          <span class="text-primary">{{ ed.duration }}</span>
        </div>
      </div>
    </div>
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
  min-height: 100vh;
}
h4,
h6 {
  margin: 1.5em 0;
}
</style>
