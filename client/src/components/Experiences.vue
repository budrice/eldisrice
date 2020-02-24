<template>
  <section
    class="resume-section p-3 p-lg-5 d-flex justify-content-center"
    id="experiences"
  >
    <div class="w-100 mt-5">
      <h2 class="mb-5">Experience</h2>
      <div
        v-for="exp in content"
        :key="exp.id"
        class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5"
      >
        <div class="resume-content">
          <h3 class="mb-0">{{ exp.title }}</h3>
          <div class="subheading mb-3">{{ exp.employer }}</div>
          <p v-html="exp.html"></p>
        </div>
        <div class="resume-date text-md-right">
          <span class="text-primary">{{ exp.duration }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Experiences",
  props: {
    content: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
section#experiences {
  min-height: 100vh;
}
</style>
