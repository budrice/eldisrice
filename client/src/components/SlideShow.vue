<template>
  <div>
    <div v-if="positions[1] === 0">
      <VideoHeader :video-file="video" />
    </div>
    <div
      :class="
        positions[1] === 0
          ? 'bar-slide w-100 p-3'
          : 'bar-slide-collapse w-100 p-3'
      "
    >
      <b-container fluid class="frame">
        <b-row>
          <b-col cols="12" md="8" offset-md="2">
            <h1 class="header-tag">{{ title }}</h1>
            <h2 class="header-tag-sub">{{ subtitle }}</h2>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import windowScrollPosition from "../plugins/window-scroll-position"
import VideoHeader from "@/components/VideoHeader"

export default {
  name: "SlideShow",
  mixins: [windowScrollPosition("positions")],
  props: {
    slides: {
      type: Array,
      required: true
    },
    video: {
      type: String,
      required: true
    }
  },
  components: {
    VideoHeader
  },
  data() {
    return {
      show: true,
      isRunning: true,
      title: "",
      subtitle: "",
      mainProps: { width: 400, height: 250, class: "mid" }
    }
  },
  methods: {
    loop: function() {
      const len = this.slides.length
      for (let i = 0, p = Promise.resolve(); i < len; i++) {
        p = p.then(
          () =>
            new Promise(resolve => {
              this.change(this.slides[i]).then(() => {
                if (i === len - 1) {
                  this.isRunning = false
                  if (this.positions[1] > 0) {
                    this.show = false
                  }
                }
                resolve()
              })
            })
        )
      }
    },
    change: function(slide) {
      return new Promise(resolve => {
        this.title = slide.title
        this.subtitle = slide.subtitle
        setTimeout(() => {
          resolve(true)
        }, 4000)
      })
    }
  },
  watch: {
    slides: {
      handler: function(val) {
        if (val) {
          this.loop()
        }
      }
    },
    positions: {
      handler: function(val) {
        if (!this.isRunning && val[1] === 0) {
          this.isRunning = true
          this.show = true
          this.loop()
        }
      }
    }
  },
  mounted() {
    this.loop()
  }
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 4.5em;
}
h2 {
  font-size: 4em;
}
h1,
h2 {
  font-family: Impact;
  letter-spacing: 0.2em;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 3px rgb(0, 0, 0);
}
.header-tag {
  width: 100%;
  text-align: center;
  &-sub {
    width: 100%;
    margin-top: 0;
    text-align: center;
  }
}
.mid {
  display: block;
  margin-left: calc(50vw - 200px);
}
.bar-slide {
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 370px;
  background-color: rgba(0, 123, 255, 0.3);
  &-collapse {
    display: none;
  }
}
.frame {
  padding: 85px 3px 3px;
}
@media only screen and (max-width: 450px) {
  .header-tag {
    width: auto;
    &-sub {
      width: auto;
    }
  }
  .mid {
    margin: 0;
  }
}
@media only screen and (max-width: 1280px) {
  .header-tag {
    font-size: 3em;
    &-sub {
      font-size: 2.5em;
    }
  }
}
</style>
