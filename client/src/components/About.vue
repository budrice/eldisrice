<template>
  <section id="about">
    <h1 class="mb-3">About</h1>
    <article class="mb-5"><div v-html="content.html"></div></article>
  </section>
</template>

<script>
export default {
  name: "About",
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
section#about {
  min-height: 100vh;
  padding: 95px 15px;
}
</style>
