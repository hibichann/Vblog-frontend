<template>
  <page-frame :color="'white'">
    <div class="title"><i class="fa fa-question-circle"></i>&nbsp;Test DAPP based on Goerli</div>
    <div class="flex flex-col items-center">
      <a class="robo">Robo Punk</a>
      <a class="krypt mt-5"><img src="./static/logo.png" /></a>
    </div>
  </page-frame>
</template>

<script lang="ts" name="" setup></script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P');
@import url('https://fonts.googleapis.com/css?family=V2323');
.title {
  padding: 20px;
  font-size: 20px;
}
.robo {
  text-align: center;
  font-family: 'Press Start 2P', 'V2323';
  color: white;
  font-size: 48px;
  letter-spacing: 5.5%;
  text-shadow: 0 5px #000;
  padding: 10px 50px;
  border-radius: 5px;
  user-select: none;
  cursor: pointer;
  background-color: rgb(255, 157, 28);
}
.krypt {
  border-radius: 5px;
  user-select: none;
  cursor: pointer;
  padding: 10px 50px;
  background-color: rgb(8, 21, 63);
}
</style>
