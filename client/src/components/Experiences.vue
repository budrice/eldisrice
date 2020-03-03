<template>
  <section id="experiences">
    <h1 class="mb-3">Experience</h1>
    <b-row v-for="exp in content" :key="exp.id" class="sec mb-3">
      <b-row class="w-100">
        <b-col cols="12" md="6">
          <h3 class="mb-3">{{ exp.title }}</h3>
          <h5>{{ exp.employer }}</h5>
        </b-col>
        <b-col cols="12" md="6" class="text-md-right">
          <h5 style="color: orange;">{{ exp.duration }}</h5>
        </b-col>
      </b-row>
      <article><div v-html="exp.html"></div></article>
    </b-row>
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

<style scoped>
section#experiences {
  padding: 95px 15px;
}
</style>
