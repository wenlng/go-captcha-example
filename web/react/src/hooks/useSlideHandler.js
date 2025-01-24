/**
 * @Author Awen
 * @Date 2024/05/25
 * @Email wengaolng@gmail.com
 **/

import {useCallback, useEffect, useRef, useState} from "react";
import Lodash from "lodash";
import Axios from 'axios'
import { Message } from '@arco-design/web-react';
import Qs from 'qs'

export const useSlideHandler = (domRef, config) => {
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
    domRef.current.clear && domRef.current.clear()
    Axios({
      method: 'get',
      url: config.getApi,
    }).then((response)=>{
      const {data = {}} = response;
      if (!Lodash.isEmpty(data) && (data['code'] || 0) === 0) {
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
        Message.warning(`failed get captcha data`)
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
        Message.success(`check captcha data success`)
        setState({...state, popoverVisible: false, type: "success"})
      } else {
        Message.warning(`failed check captcha data`)
        setState({...state, type: "error"})
      }

      setTimeout(() => {
        requestCaptchaData()
      }, 1000)
    }).catch((e)=>{
      console.warn(e)
    })
  }, [data, state, setState, config.checkApi, requestCaptchaData])

  useEffect(() => {
    // if (state.popoverVisible) {
      requestCaptchaData()
    // }
  }, [])

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
