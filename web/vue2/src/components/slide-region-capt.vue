<template>
  <gocaptcha-slide-region
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
import {useHandler} from "../hooks/useSlideHandler";
import {ref} from "vue";

const domRef = ref(null)

const handler = useHandler(domRef, {
  getApi: "/api/go-captcha-data/slide-region",
  checkApi: "/api/go-captcha-check-data/slide-region"
})
</script>

<style>

</style>
