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
        cData.thumb = data['tile_base64'] || ''
        cData.captKey = data['captcha_key'] || ''
        cData.thumbX = data['tile_x'] || 0
        cData.thumbY = data['tile_y'] || 0
        cData.thumbWidth = data['tile_width'] || 0
        cData.thumbHeight =data['tile_height'] || 0
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

  const confirmEvent = (point, clear) => {
    Axios({
      method: 'post',
      url: config.checkApi,
      data: Qs.stringify({
        point: [point.x, point.y].join(','),
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
