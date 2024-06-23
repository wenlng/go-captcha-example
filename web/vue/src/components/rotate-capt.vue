<template>
  <gocaptcha-rotate
    :data="handler.data"
    :events="{
      close: handler.closeEvent,
      refresh: handler.refreshEvent,
      confirm: handler.confirmEvent,
    }"
  />
</template>

<script setup>
import {useHandler} from "../hooks/useRotateHandler";

const handler = useHandler({
  getApi: "/api/go-captcha-data/rotate-basic",
  checkApi: "/api/go-captcha-check-data/rotate-basic"
})

</script>

<style>

</style>
