<script setup>
import {useGithub} from "@/hooks/useGithub";
import ClickTextCapt from "./components/click-text-capt.vue";
import ClickShapeCapt from "./components/click-shape-capt.vue";
import SlideCapt from "./components/slide-capt.vue";
import SlideRegionCapt from "./components/slide-region-capt.vue";
import RotateCapt from "./components/rotate-capt.vue";

useGithub()
</script>

<template>
  <div class="container">
    <div class="item"> <click-text-capt /> </div>
    <div class="item"> <click-shape-capt /> </div>
    <div class="item"> <slide-capt /> </div>
    <div class="item"> <slide-region-capt /> </div>
    <div class="item"> <rotate-capt /> </div>

    <div class="cap-tip">
      <a href="https://github.com/wenlng/go-captcha/releases">
        <img src="https://img.shields.io/github/tag/wenlng/go-captcha.svg" alt="version"/>
      </a>
      <a class="github-button" href="https://github.com/wenlng/go-captcha" data-size="large"
         data-show-count="true" aria-label="Star wenlng/go-captcha on GitHub">Star</a>
      <a class="github-button" href="https://github.com/wenlng/go-captcha/fork" data-size="large"
         data-show-count="true" aria-label="Fork wenlng/go-captcha on GitHub">Fork</a>
    </div>
  </div>
</template>

<style>
html, body {
  width: 100%;
  padding: 0;
  margin: 0;
  color: #3C3C3C;
  background: #EBF3FB;
}

#app{
  width: 100%;
}

.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
}

.item {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.cap-tip{
  padding: 50px 20px 100px;
  font-size: 13px;
  color: #76839b;
  text-align: center;
  line-height: 180%;
  width: 100%;

  display:-webkit-box;
  display:-webkit-flex;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
  justify-content: center;
  justify-items: center;
}

.cap-tip a {
  display: block;
  margin: 0 5px;
}

.cap-tip a img {
  height: 27px;
}

.cap-tip span {
  margin: 0 5px;
}
</style>
