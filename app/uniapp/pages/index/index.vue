<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx-nav">
			<text class="wx-nav-text">Captcha Demo</text>
		</view>
		<!-- #endif -->
    <view class="content">
      <view class="space" />
      <click-capt/>
      <view class="space" />
      <click-shape-capt/>
      <view class="space" />
      <rotate-capt/>
      <view class="space" />
      <slide-capt/>
      <view class="space" />
      <slide-region-capt/>
      <view class="space" />
    </view>
	</view>
</template>

<script setup>
  import clickCapt from '@/components/click-text-capt.vue'
  import clickShapeCapt from '@/components/click-shape-capt.vue'
  import rotateCapt from '@/components/rotate-capt.vue'
  import slideCapt from '@/components/slide-capt.vue'
  import slideRegionCapt from '@/components/slide-region-capt.vue'
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  background: #f5f5f5;
}

.space {
  height: 30px;
}
</style>
