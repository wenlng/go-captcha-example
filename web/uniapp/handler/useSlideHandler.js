/**
 * @Author Awen
 * @Date 2024/06/01
 * @Email wengaolng@gmail.com
 **/

import Qs from 'qs'
import { onMounted, reactive, watch } from 'vue'
import {request} from "../helper/request";

export const useHandler = (domRef, config) => {
  const state = reactive({popoverVisible: false, type: "default"})
  const cData = reactive({image: "", thumb: "", captKey: "", thumbX: 0, thumbY: 0, thumbWidth: 0, thumbHeight: 0})

  const clickEvent = () => {
    state.popoverVisible = true
  }

  const visibleChangeEvent = (visible) => {
    state.popoverVisible = visible
  }

  const closeEvent = () => {
    state.popoverVisible = false
  }

  const requestCaptchaData = async () => {
    domRef.value.clear && domRef.value.clear()

    const res = await request.get(config.getApi)
    const data = res.data || {};
    if (data && (data['code'] || 0) === 0) {
      cData.image = data['image_base64'] || ''
      cData.thumb = data['tile_base64'] || ''
      cData.captKey = data['captcha_key'] || ''
      cData.thumbX = data['tile_x'] || 0
      cData.thumbY = data['tile_y'] || 0
      cData.thumbWidth = data['tile_width'] || 0
      cData.thumbHeight =data['tile_height'] || 0
    } else {
      uni.showModal({
        title: 'Tip',
        content: 'get data failed',
        showCancel: false
      });
    }
  }

  const refreshEvent = () => {
    requestCaptchaData()
  }

  const confirmEvent = async (point, clear) => {
    const params = Qs.stringify({
      point: [point.x, point.y].join(','),
      key: cData.captKey || ''
    })
    const res = await request.post(config.checkApi + '?' + params, {})

    const data = res.data || {};
    if (data && (data['code'] || 0) === 0) {
      state.popoverVisible = false
      state.type = "success"
      uni.showModal({
        title: 'Tip',
        content: 'check data success',
        showCancel: false
      });
    } else {
      uni.showModal({
        title: 'Tip',
        content: 'check data failed',
        showCancel: false
      });
    }

    setTimeout(() => {
      requestCaptchaData()
    }, 1000)
  }

  watch(() => state.popoverVisible, () => {
    if (state.popoverVisible) {
      requestCaptchaData()
    }
  })

  onMounted(( ) => {
    requestCaptchaData()
  })

  return {
    state,
    data: cData,
    visibleChangeEvent,
    clickEvent,
    closeEvent,
    refreshEvent,
    confirmEvent,
  }
}
