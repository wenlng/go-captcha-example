<template>
  <gocaptcha-slide
    :data="handler.data"
    :events="{
      close: handler.closeEvent,
      refresh: handler.refreshEvent,
      confirm: handler.confirmEvent,
    }"
  />
</template>

<script setup>
import {useHandler} from "../hooks/useSlideHandler";

const handler = useHandler({
  getApi: "/api/go-captcha-data/slide-basic",
  checkApi: "/api/go-captcha-check-data/slide-basic"
})

</script>

<style>

</style>
