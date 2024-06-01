<template>
  <div>
    <el-popover
      :value="handler.state.popoverVisible"
      @show="handler.visibleChangeEvent"
      @hide="handler.visibleChangeEvent"
      placement="top"
      trigger="click">
      <gocaptcha-slide-region
          :config="{
            width: 300,
            height: 240,
            showTheme: false,
            verticalPadding: 5,
            horizontalPadding: 5,
          }"
          :data="handler.data"
          :events="{
            close: handler.closeEvent,
            refresh: handler.refreshEvent,
            confirm: handler.confirmEvent,
          }"
      />
      <template slot="reference">
        <gocaptcha-button :type="handler.state.type" @click-event="handler.clickEvent" title="点击进行区域滑动校验"/>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import {useHandler} from "@/hooks/useSlideHandler";

const handler = useHandler({
  getApi: "/api/go-captcha-data/slide-region",
  checkApi: "/api/go-captcha-check-data/slide-region"
})
</script>

<style>

</style>
