/**
 * @Author Awen
 * @Date 2024/06/01
 * @Email wengaolng@gmail.com
 **/

import Lodash from "lodash";
import Axios from 'axios'
import { useMessage } from 'naive-ui'
import Qs from 'qs'
import { onMounted, reactive, watch } from 'vue'

export const useHandler = (config) => {
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
    Axios({
      method: 'get',
      url: config.getApi,
    }).then((response)=>{
      const {data = {}} = response;
      if ((data['code'] || 0) === 0) {
        if (Lodash.isEmpty(data)) {
          return
        }
        cData.image = data['image_base64'] || ''
        cData.thumb = data['thumb_base64'] || ''
        cData.captKey = data['captcha_key'] || ''
      } else {
       message.warning(`failed get captcha data`)
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }

  const refreshEvent = () => {
    requestCaptchaData()
  }

  const confirmEvent = (angle, clear) => {
    Axios({
      method: 'post',
      url: config.checkApi,
      data: Qs.stringify({
        angle: angle,
        key: cData.captKey || ''
      }),
    }).then((response)=>{
      const {data = {}} = response;
      if ((data['code'] || 0) === 0) {
       message.success(`check captcha data success`)
        state.popoverVisible = false
        state.type = "success"
      } else {
       message.warning(`failed check captcha data`)
        state.type = "error"
      }

      setTimeout(() => {
        clear()
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
