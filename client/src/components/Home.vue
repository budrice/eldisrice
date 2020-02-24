<template>
  <section :class="section_class" id="home">
    <div class="w-100 inside-container">
      <h1 class="mb-0">
        {{ content.firstname }}
        <span class="text-primary">{{ content.lastname }}</span>
      </h1>

      <h4>{{ content.title }}</h4>

      <div class="subheading">
        <span class="email">+</span>&nbsp;{{ content.subheading }}<br />

        <a :href="`tel:${content.tel}`"
          ><span class="tel">'</span>&nbsp;<strong>{{ content.tel }}</strong></a
        ><br />

        <a :href="`mailto:${content.email}`"
          ><span class="email">:</span>&nbsp;{{ content.email }}</a
        >
      </div>

      <div v-html="content.html"></div>
      <div class="home-icons">
        <a
          v-for="(icon, i) in content.icons"
          :key="i"
          :href="icon.href"
          class="mr-3"
          target="_blank"
        >
          <i :class="icon.class"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import windowScrollPosition from "@/plugins/window-scroll-position"

export default {
  name: "Home",
  mixins: [windowScrollPosition("positions")],
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      section_class: "down resume-section p-3 d-flex align-items-center"
    }
  },
  watch: {
    positions: {
      handler(val) {
        if (val[1] < 101)
          this.section_class =
            "down resume-section p-3 d-flex align-items-center"
        else this.section_class = "resume-section p-3 d-flex align-items-center"
      }
    }
  }
}
</script>

<style scoped lang="scss">
.down {
  margin-top: 150px !important;
}
.email {
  font-family: "wingdings";
  font-size: 1.5em;
  font-weight: 600;
  color: rgb(0, 123, 255);
}
.tel {
  font-family: "wingdings 2";
  font-size: 1.5em;
  font-weight: 600;
  color: rgb(0, 123, 255);
}
.flower {
  font-family: wingdings;
  font-size: 1.5em;
  font-weight: 600;
  color: rgb(255, 0, 0);
  text-shadow: 1px 1px 1px rgb(0, 255, 0);
}
section#home {
  min-height: 100vh;
}
.inside-container {
  margin-top: 100px;
}
.home-icons {
  font-size: 48px;
}
@media only screen and (max-width: 768px) {
  .inside-container {
    margin-top: 280px;
  }
}
</style>
