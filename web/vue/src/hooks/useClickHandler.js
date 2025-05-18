/**
 * @Author Awen
 * @Date 2024/06/01
 * @Email wengaolng@gmail.com
 **/

import Lodash from "lodash";
import Axios from 'axios'
import Qs from 'qs'
import { useMessage } from 'naive-ui'
import { onMounted, reactive, watch } from 'vue'

export const useHandler = (domRef, config) => {
  const message = useMessage()
  const state = reactive({popoverVisible: false, type: "default"})
  const cData = reactive({image: "", thumb: "", captKey: ""})

  const clickEvent = () => {
    state.popoverVisible = true
  }

  const visibleChangeEvent = (visible) => {
    state.popoverVisible = visible
  }

  const closeEvent = () => {
    state.popoverVisible = false
  }

  const requestCaptchaData = () => {
    domRef.value.clear && domRef.value.clear()
    Axios({
      method: 'get',
      url: config.getApi,
      headers: {
        "X-API-Key": "my-secret-key-123"
      }
    }).then((response)=>{
      const {data = {}} = response;
      if (!Lodash.isEmpty(data) && (data['code'] || 0) === 200) {
        cData.image = data['master_image_base64'] || ''
        cData.thumb = data['thumb_image_base64'] || ''
        cData.captKey = data['captcha_key'] || ''
      } else {
        message.warning(`get data failed`)
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }

  const refreshEvent = () => {
    requestCaptchaData()
  }

  const confirmEvent = (dots, clear) => {
    const dotArr = []
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i]
      dotArr.push(dot.x, dot.y)
    }

    Axios({
      method: 'post',
      url: config.checkApi,
      data: Qs.stringify({
        dots: dotArr.join(','),
        key: cData.captKey || ''
      }),
    }).then((response)=>{
      const {data = {}} = response;
      if ((data['code'] || 0) === 0) {
        message.success(`check data success`)
        state.popoverVisible = false
        state.type = "success"
      } else {
        message.warning(`check data failed`)
        state.type = "error"
      }

      setTimeout(() => {
        requestCaptchaData()
      }, 1000)
    }).catch((e)=>{
      console.warn(e)
    })
  }

  watch(() => state.popoverVisible, () => {
    if (state.popoverVisible) {
      requestCaptchaData()
    }
  })

  onMounted( () => {
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
