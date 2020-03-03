<template>
  <section class="p-3" id="home">
    <div class="w-100 inside-container">
      <h1 class="mb-0">
        <span class="shade orange">{{ content.firstname }}</span
        >&nbsp;
        <span class="shade text-primary">{{ content.lastname }}</span>
      </h1>
      <h4>{{ content.title }}</h4>
      <div class="subheading">
        <span class="shade orange"><i class="fas fa-home"></i></span>&nbsp;{{
          content.subheading
        }}<br />
        <a :href="`tel:${content.tel}`"
          ><span class="shade orange"><i class="fas fa-phone-alt"></i></span
          >&nbsp;<strong>{{ content.tel }}</strong></a
        ><br />
        <a :href="`mailto:${content.email}`"
          ><span class="shade orange"><i class="fas fa-envelope"></i></span
          >&nbsp;{{ content.email }}</a
        >
      </div>
      <div v-html="content.html"></div>
      <div class="home-icons mb-5">
        <a
          v-for="(icon, i) in content.icons"
          :key="i"
          :href="icon.href"
          class="shade mr-3"
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
      section_class: "p-3"
    }
  }
}
</script>

<style scoped lang="scss">
// style variables
$orange: rgb(255, 180, 0);
$t-shade: 3px 3px 4px rgba(0, 0, 0, 0.5);
$t-up-shade: 4px 4px 6px rgba(50, 50, 50, 0.45);
$primary-blue: rgb(0, 123, 255);

// style classes
.inside-container {
  margin-top: 515px;
}
.shade {
  text-shadow: $t-shade;
}
.home-icons,
.home-icons a i {
  font-size: 48px;
  color: $primary-blue !important;
  text-shadow: $t-shade;
  &.visited {
    font-size: 48px;
    color: $primary-blue !important;
    text-shadow: $t-shade;
  }
  &:hover {
    font-size: 52px;
    color: $orange !important;
    margin: -4px -4px 0 0;
    text-shadow: $t-up-shade;
  }
}
.orange {
  color: $orange !important;
}
</style>
