<template>
  <gocaptcha-click
    :data="handler.data"
    :events="{
      close: handler.closeEvent,
      refresh: handler.refreshEvent,
      confirm: handler.confirmEvent,
    }"
  />
</template>

<script setup>
import {useHandler} from "../hooks/useClickHandler";

const handler = useHandler({
  getApi: "/api/go-captcha-data/click-shape",
  checkApi: "/api/go-captcha-check-data/click-shape"
})

</script>

<style>

</style>
