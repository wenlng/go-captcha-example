<template>
  <go-captcha-uni
    type="click"
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
import {useHandler} from "../handler/useClickHandler";
import {ref} from "vue";

const domRef = ref(null)

const handler = useHandler(domRef, {
  getApi: "/api/go-captcha-data/click-shape",
  checkApi: "/api/go-captcha-check-data/click-shape"
})

</script>

<style>

</style>
