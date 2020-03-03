<template>
  <section id="skills">
    <h1 class="mb-3">Skills</h1>
    <div class="mb-3">{{ content.subheading }}</div>
    <article class="mb-5"><div v-html="content.html"></div></article>
    <p></p>
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
  padding: 95px 15px;
}
.icon-text {
  font-size: 0.8em;
  font-weight: 100;
}
</style>
