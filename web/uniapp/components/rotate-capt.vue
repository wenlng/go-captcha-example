<template>
  <go-captcha-uni
    type="rotate"
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
import GoCaptchaUni from 'go-captcha-uni'
import {useHandler} from "../handler/useRotateHandler";
import {ref} from "vue";

const domRef = ref(null)
const handler = useHandler(domRef, {
  getApi: "/api/go-captcha-data/rotate-basic",
  checkApi: "/api/go-captcha-check-data/rotate-basic"
})

</script>

<style>

</style>
