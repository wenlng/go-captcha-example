<template>
  <go-captcha-uni
    type="drag"
    :data="handler.data"
    @event-confirm="handler.confirmEvent"
    @event-refresh="handler.refreshEvent"
    @event-close="handler.closeEvent"
    ref="domRef"
  />
</template>

<script setup>
import GoCaptchaUni from 'go-captcha-uni'
import {useHandler} from "../handler/useSlideHandler";
import {ref} from "vue";

const domRef = ref(null)
const handler = useHandler(domRef, {
  getApi: "/api/go-captcha-data/slide-region",
  checkApi: "/api/go-captcha-check-data/slide-region"
})
</script>

<style>

</style>
