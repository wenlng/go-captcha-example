<template>
  <gocaptcha-click
    :data="handler.data"
    :events="{
      click: clickevnt,
      close: handler.closeEvent,
      refresh: handler.refreshEvent,
      confirm: handler.confirmEvent,
    }"
  />
</template>

<script setup>
import {useHandler} from "../hooks/useClickHandler";
const handler = useHandler({
  getApi: "/api/go-captcha-data/click-basic",
  checkApi: "/api/go-captcha-check-data/click-basic"
})

const clickevnt = (x, y) => {
  console.log('click >>>>>>>>>>>', x, y)
}
</script>

<style>

</style>
