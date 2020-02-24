<template>
  <section
    class="resume-section p-3 p-lg-5 d-flex align-items-center"
    id="skills"
  >
    <div class="w-100 mt-5">
      <h2 class="mb-5">Skills</h2>
      <div class="subheading mb-3">{{ content.subheading }}</div>
      <p v-html="content.html" class="lead mb-5"></p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Skills",
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
section#skills {
  min-height: 100vh;
}
.icon-text {
  font-size: 0.8em;
  font-weight: 100;
}
</style>
