<template>
  <div>
    <el-popover
      :value="handler.state.popoverVisible"
      @show="handler.visibleChangeEvent"
      @hide="handler.visibleChangeEvent"
      placement="top"
      trigger="click">
      <gocaptcha-click
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
        <gocaptcha-button :type="handler.state.type" @click-event="handler.clickEvent" title="点击进行图形点选校验"/>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import {useHandler} from "@/hooks/useClickHandler";

const handler = useHandler({
  getApi: "/api/go-captcha-data/click-shape",
  checkApi: "/api/go-captcha-check-data/click-shape"
})
</script>

<style>

</style>
