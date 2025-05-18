<template>
  <gocaptcha-click
    :data="handler.data"
    :events="{
      click: clickevnt,
      close: handler.closeEvent,
      refresh: handler.refreshEvent,
      confirm: handler.confirmEvent,
    }"
    ref="domRef"
  />
</template>

<script setup>
import {useHandler} from "../hooks/useClickHandler";
import {ref} from "vue";

const domRef = ref(null)

const handler = useHandler(domRef, {
  // getApi: "/api/go-captcha-data/click-basic",
  // checkApi: "/api/go-captcha-check-data/click-basic"
  getApi: "get-data?id=click_dark_en",
  checkApi: "/api/go-captcha-check-data/click-basic"
})

const clickevnt = (x, y) => {
  console.log('click >>>>>>>>>>>', x, y)
}
</script>

<style>

</style>
