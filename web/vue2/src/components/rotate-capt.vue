<template>
  <gocaptcha-rotate
    :data="handler.data"
    :events="{
      close: handler.closeEvent,
      refresh: handler.refreshEvent,
      confirm: handler.confirmEvent,
    }"
    ref="domRef"
  />
</template>

<script setup>
import {useHandler} from "../hooks/useRotateHandler";
import {ref} from "vue";

const domRef = ref(null)

const handler = useHandler(domRef, {
  getApi: "/api/go-captcha-data/rotate-basic",
  checkApi: "/api/go-captcha-check-data/rotate-basic"
})
</script>

<style>

</style>
