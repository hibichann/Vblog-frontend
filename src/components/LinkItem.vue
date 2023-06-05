<template>
  <div
    class="body"
    @click="Go"
  >
    <div class="left">
      <img :src="props.pfp" />
    </div>
    <div class="right">
      <div>{{ props.title }}</div>
      <div>{{ props.word }}</div>
    </div>
  </div>
</template>

<script lang="ts" name="" setup>
const props = defineProps(['pfp', 'title', 'link', 'word'])
const Go = () => {
  window.open(props.link, '_blank')
}
</script>
<style lang="scss" scoped>
.body {
  cursor: pointer;
  border-radius: 10px;
  margin: 8px;
  text-align: center;
  justify-content: center;
  height: 80px;
  width: 350px;
  margin: 10px;
  box-shadow: 2px 2px 10px 2px #888;
  display: grid;
  grid-template-columns: 80px 270px;
  transition: all ease-in 0.2s;
  // color: #fff;
  img {
    border-radius: 50%;
    height: 60px;
    width: 60px;
    margin: 10px;
    object-fit: cover;
    box-shadow: 0px 0px 10px 2px #888;
  }
  .left {
    background-color: #fff;
    border-radius: 10px 0 0 10px;
    background-color: #a9c9ff;
    background-image: linear-gradient(180deg, #a9c9ff 0%, #ffbbec 100%);
  }
  .right {
    border-radius: 0 10px 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    :first-child {
      font-weight: bold;
      font-size: 18px;
    }
  }
}
.body:hover {
  box-shadow: -2px -2px 10px 2px #888;
  transition: all ease-in 0.2s;
}
</style>
