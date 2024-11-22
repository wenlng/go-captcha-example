/**
 * @Author Awen
 * @Date 2024/06/01
 * @Email wengaolng@gmail.com
 **/

import Lodash from "lodash";
import Axios from 'axios'
import Qs from 'qs'
import {createSignal, onMount} from "solid-js";
import toast from 'solid-toast';

export const useRotateHandler = (config) => {
  let domRef
  const [state, setState] = createSignal({popoverVisible: false, type: "default"})
  const [cData, setCData] = createSignal({image: "", thumb: "", captKey: ""})

  const clickEvent = () => {
    setState({...state(), popoverVisible: true})
  }

  const visibleChangeEvent = (visible) => {
    setState({...state(), popoverVisible: visible})
  }

  const closeEvent = () => {
    setState({...state(), popoverVisible: false})
  }

  const requestCaptchaData = () => {
    domRef.clear && domRef.clear()

    Axios({
      method: 'get',
      url: config.getApi,
    }).then((response)=>{
      const {data = {}} = response;
      if (!Lodash.isEmpty(data) && (data['code'] || 0) === 0) {
        setCData({
          ...cData(),
          image: data['image_base64'] || '',
          thumb: data['thumb_base64'] || '',
          captKey: data['captcha_key'] || ''
        })
      } else {
        toast.error('get data failed')
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }

  const refreshEvent = () => {
    requestCaptchaData()
  }

  const confirmEvent = (angle) => {
    Axios({
      method: 'post',
      url: config.checkApi,
      data: Qs.stringify({
        angle: angle,
        key: cData().captKey || ''
      }),
    }).then((response)=>{
      const {data = {}} = response;
      if ((data['code'] || 0) === 0) {
        toast.success('check data success')
        setState({...state(), popoverVisible: false, type: 'success'})
      } else {
        toast.error('check data failed')
        setState({...state(), type: 'error'})
      }


      setTimeout(() => {
        requestCaptchaData()
      }, 1000)
    }).catch((e)=>{
      console.warn(e)
    })
  }

  const init = (ref) => {
    domRef = ref
    requestCaptchaData()
  }

  return {
    state,
    data: cData,
    init,
    visibleChangeEvent,
    clickEvent,
    closeEvent,
    refreshEvent,
    confirmEvent,
  }
}
