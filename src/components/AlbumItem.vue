<template>
  <!-- 单个相册封面主体 -->
  <div class="mainAlbumBody">
    <span class="span1">相册名字<br /></span>
    <span class="span2">最近：2019-01-01</span>
    <div :style="{ height: '5px' }"></div>
    <div class="a"><img src="https://blog.chevereto.com/photos/2022/pexels-prakash-aryal-38326.jpg" /></div>
  </div>
</template>

<script lang="ts" name="" setup></script>

<style lang="scss" scoped>
// .a {
//   filter: drop-shadow(0.5);
// }
.mainAlbumBody {
  width: 45%;
  margin: 10px 0;
  min-width: 250px;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px 5px #4e66927a inset;
  border-radius: 10px;
  padding: 20px;
  .a {
    filter: brightness(1) blur(0px);
    transition: all 0.5s;
  }
}
.span1 {
  position: relative;
  top: 0;
  left: 0;
  font-size: 20px;
  line-height: 35px;
  transition: all 0.5s;
  z-index: 99;
}
.span2 {
  position: relative;
  top: 30%;
  left: 5%;
  color: rgba(255, 255, 255, 0);
  font-size: 0;
  line-height: 0;
  transition: all 0.5s;
  z-index: 99;
}
.mainAlbumBody:hover {
  .span1 {
    top: 25%;
    left: 5%;
    font-size: 35px;
    transition: all 0.5s;
  }
  .span2 {
    color: white;
    font-size: 16px;
    transition: all 0.5s;
  }
  .a {
    filter: brightness(70%) blur(5px);
    transition: all 0.5s;
  }
  cursor: pointer;
}
img {
  width: 100%;
  height: 100%;
}
</style>
