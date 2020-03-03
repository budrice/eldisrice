<template>
  <header id="video_container">
    <video
      id="video"
      playsinline="playsinline"
      autoplay="autoplay"
      muted="muted"
      loop="loop"
    >
      <source :src="require(`@/assets/videos/${videoFile}`)" type="video/mp4" />
    </video>
  </header>
</template>

<script>
export default {
  name: "VideoHeader",
  props: {
    videoFile: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
header#video_container {
  float: left;
  position: absolute;
  left: 0;
  top: 0;
  height: 370px;
  width: 100%;
  overflow: hidden;
  z-index: 0;
}
video#video {
  position: absolute;
  left: calc(50vw - 960px);
  top: -293px;
  z-index: 0;
}
</style>
