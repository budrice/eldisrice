<template>
  <section
    class="resume-section p-3 p-lg-5 d-flex align-items-center"
    id="about"
  >
    <div class="w-100 mt-5">
      <h2 class="mb-5">About</h2>
      <p v-html="content.html"></p>
    </div>
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

<style scoped lang="scss">
section#about {
  min-height: 100vh;
}
</style>
