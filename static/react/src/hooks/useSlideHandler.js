/**
 * @Author Awen
 * @Date 2024/05/25
 * @Email wengaolng@gmail.com
 **/

import {useCallback, useEffect, useState} from "react";
import Lodash from "lodash";
import Axios from 'axios'
import { message } from 'antd';
import Qs from 'qs'

export const useSlideHandler = (config) => {
  const [state, setState] = useState({})
  const [data, setData] = useState({})

  const clickEvent = useCallback(() => {
    setState({...state, popoverVisible: true})
  }, [state])

  const visibleChangeEvent = useCallback((visible) => {
    setState({...state, popoverVisible: visible})
  }, [state])

  const closeEvent = useCallback(() => {
    setState({...state, popoverVisible: false})
  }, [state])

  const requestCaptchaData = useCallback(() => {
    Axios({
      method: 'get',
      url: config.getApi,
    }).then((response)=>{
      const {data = {}} = response;
      if ((data['code'] || 0) === 0) {
        if (Lodash.isEmpty(data)) {
          return
        }
        setData({
          image: data['image_base64'] || '',
          thumb:  data['tile_base64'] || '',
          captKey:  data['captcha_key'] || '',
          thumbX: data['tile_x'] || 0,
          thumbY: data['tile_y'] || 0,
          thumbWidth: data['tile_width'] || 0,
          thumbHeight: data['tile_height'] || 0,
        })
      } else {
        message.warning(`failed get captcha data`)
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }, [setData, config.getApi])

  const refreshEvent = useCallback(() => {
    requestCaptchaData()
  }, [requestCaptchaData])

  const confirmEvent = useCallback((point, clear) => {
    Axios({
      method: 'post',
      url: config.checkApi,
      data: Qs.stringify({
        point: [point.x, point.y].join(','),
        key: data.captKey || ''
      }),
    }).then((response)=>{
      const {data = {}} = response;
      if ((data['code'] || 0) === 0) {
        message.success(`check captcha data success`)
        setState({...state, popoverVisible: false, type: "success"})
      } else {
        message.warning(`failed check captcha data`)
        setState({...state, type: "error"})
      }

      setTimeout(() => {
        clear()
        requestCaptchaData()
      }, 1000)
    }).catch((e)=>{
      console.warn(e)
    })
  }, [data, setState, config.checkApi, requestCaptchaData])

  useEffect(() => {
    if (state.popoverVisible) {
      requestCaptchaData()
    }
  }, [state.popoverVisible, requestCaptchaData])

  return {
    state,
    data,
    visibleChangeEvent,
    clickEvent,
    closeEvent,
    refreshEvent,
    confirmEvent,
  }
}
