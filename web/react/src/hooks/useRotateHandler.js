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

export const useRotateHandler = (domRef, config) => {
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
          thumb: data['thumb_base64'] || '',
          thumbSize: data['thumb_size'] || 0,
          captKey: data['captcha_key'] || '',
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

  const confirmEvent = useCallback((angle, clear) => {
    Axios({
      method: 'post',
      url: config.checkApi,
      data: Qs.stringify({
        angle: angle,
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
