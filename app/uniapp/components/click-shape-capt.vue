<template>
  <go-captcha-uni
    type="click"
    :data="handler.data"
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
  getApi: "/api/go-captcha-data/click-shape",
  checkApi: "/api/go-captcha-check-data/click-shape"
})

</script>

<style>

</style>
