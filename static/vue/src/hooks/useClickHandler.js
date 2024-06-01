/**
 * @Author Awen
 * @Date 2024/06/01
 * @Email wengaolng@gmail.com
 **/

import Lodash from "lodash";
import Axios from 'axios'
import { Message } from 'element-ui';
import Qs from 'qs'
import {reactive, watch} from "vue";

export const useHandler = (config) => {
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
        Message.warning(`failed get captcha data`)
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
        Message.success(`check captcha data success`)
        state.popoverVisible = false
        state.type = "success"
      } else {
        Message.warning(`failed check captcha data`)
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
