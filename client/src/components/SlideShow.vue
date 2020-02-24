<template>
  <div>
    <div v-if="positions[1] < 100">
      <VideoHeader :video-file="`cubes.mp4`" />
    </div>
    <div
      :class="
        positions[1] >= 100 ? 'bar-slide-collapse w-100' : 'bar-slide w-100'
      "
    >
      <h1 :class="headertag.class" class="header-tag">
        {{ title }}
      </h1>
      <b-img
        id="logo"
        fluid
        v-bind="mainProps"
        :src="require(`@/assets/img/slider/slides/${image || 'img-1.png'}`)"
        alt=""
      />
      <b-img
        id="head"
        fluid
        v-if="index === 2"
        v-bind="headProps"
        :src="require(`../assets/img/head.png`)"
        alt=""
      />
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
      required: false,
      default: () => {
        return [
          {
            id: 1,
            imagename: "img-1.png"
          }
        ]
      }
    }
  },
  components: {
    VideoHeader
  },
  data() {
    return {
      index: 0,
      isRunning: true,
      image: "",
      title: "",
      subtitle: "",
      headertag: { class: "right" },
      mainProps: { width: 450, height: 196, class: "left" },
      headProps: { width: 200, height: 200, class: "headshot" }
    }
  },
  methods: {
    loop: function() {
      const len = this.slides.length
      for (let i = 0, p = Promise.resolve(); i < len; i++) {
        p = p.then(
          () =>
            new Promise(resolve => {
              this.index = i
              console.log(`CHANGING to slide # ${i + 1}`)
              this.change(this.slides[i]).then(() => {
                if (i === len - 1) {
                  if (this.positions[1] < 101) window.scrollTo(0, 101)
                  this.isRunning = false
                }
                resolve(true)
              })
            })
        )
      }
    },
    change: function(slide) {
      this.image = slide.imagename
      this.title = slide.title
      this.subtitle = slide.subtitle
      const moveout = () => {
        return new Promise(resolve => {
          setTimeout(() => {
            this.headertag.class = "mid"
            this.mainProps.class = "mid"
          }, 10)
          setTimeout(() => {
            this.headProps.class = "headshot-moveout"
          }, 600)
          setTimeout(() => {
            resolve()
          }, 6000)
        })
      }
      const movein = () => {
        return new Promise(resolve => {
          this.headertag.class = "right"
          this.mainProps.class = "left"
          this.headProps.class = "headshot"
          resolve(true)
        })
      }
      return new Promise(resolve => {
        moveout()
          .then(movein)
          .then(() => {
            setTimeout(() => {
              resolve(true)
            }, 3000)
          })
      })
    }
  },
  watch: {
    positions: {
      handler: function(val) {
        if (!this.isRunning && val[1] < 101) {
          this.isRunning = true
          this.loop()
        } else if (this.isRunning && val[1] >= 101) {
          console.log("NOT RUNNING")
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
.header-tag {
  width: 450px;
  margin-top: 0;
  text-align: center;
}
.headshot {
  position: fixed;
  left: calc(100vw + 2000px);
  top: 180px;
  -webkit-transition: all 2s ease;
  -moz-transition: all 2s ease;
  -o-transition: all 2s ease;
  -ms-transition: all 2s ease;
  transition: all 2s ease;
  &-moveout {
    position: fixed;
    left: calc(100vw - 300px);
    top: 180px;
    -webkit-transition: all 2s ease;
    -moz-transition: all 2s ease;
    -o-transition: all 2s ease;
    -ms-transition: all 2s ease;
    transition: all 2s ease;
  }
}
.left {
  margin-left: -1000px;
  -webkit-transition: all 2s ease;
  -moz-transition: all 2s ease;
  -o-transition: all 2s ease;
  -ms-transition: all 2s ease;
  transition: all 2s ease;
}
.mid {
  margin-left: calc(50vw - 225px);
  -webkit-transition: all 2s ease;
  -moz-transition: all 2s ease;
  -o-transition: all 2s ease;
  -ms-transition: all 2s ease;
  transition: all 2s ease;
}
.right {
  margin-left: calc(100vw + 2000px);
  -webkit-transition: all 2s ease;
  -moz-transition: all 2s ease;
  -o-transition: all 2s ease;
  -ms-transition: all 2s ease;
  transition: all 2s ease;
}
.bar-slide {
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 20px;
  width: 100%;
  height: 300px;
  &-collapse {
    z-index: 9999;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 0px;
    display: none;
  }
}
@media only screen and (max-width: 768px) {
  .header-tag {
    font-size: 24px;
  }
  .headshot {
    height: 120px;
    width: 120px;
    position: fixed;
    left: calc(100vw + 1000px);
    top: 300px;
    -webkit-transition: all 2s ease;
    -moz-transition: all 2s ease;
    -o-transition: all 2s ease;
    -ms-transition: all 2s ease;
    transition: all 2s ease;
    &-moveout {
      height: 80px;
      width: 80px;
      position: fixed;
      left: calc(100vw - 100px);
      top: 300px;
      -webkit-transition: all 2s ease;
      -moz-transition: all 2s ease;
      -o-transition: all 2s ease;
      -ms-transition: all 2s ease;
      transition: all 2s ease;
    }
  }
}
</style>
