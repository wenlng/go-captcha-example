<template>
  <go-captcha-uni
    type="click"
    :data="handler.data"
    @event-click="clickevnt"
    @event-confirm="handler.confirmEvent"
    @event-refresh="handler.refreshEvent"
    @event-close="handler.closeEvent"
    ref="domRef"
  />
</template>

<script setup>
import GoCaptchaUni from 'go-captcha-uni'
import {useHandler} from "../handler/useClickHandler";
import {ref} from "vue";

const domRef = ref(null)

const handler = useHandler(domRef, {
  getApi: "/api/go-captcha-data/click-basic",
  checkApi: "/api/go-captcha-check-data/click-basic"
})

const clickevnt = (x, y) => {
  console.log('click >>>>>>>>>>>', x, y)
}
</script>

<style>

</style>
