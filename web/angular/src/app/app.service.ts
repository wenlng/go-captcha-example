import Axios from "axios";
// @ts-ignore
import Lodash from 'lodash';
// @ts-ignore
import Qs from 'qs'
import {HotToastService} from "@ngxpert/hot-toast";
import {Injectable} from "@angular/core";

const apiPaths = {
  getApiForClickText: "/api/go-captcha-data/click-basic",
  checkApiForClickText: "/api/go-captcha-check-data/click-basic",

  getApiForRotate: "/api/go-captcha-data/rotate-basic",
  checkApiForRotate: "/api/go-captcha-check-data/rotate-basic",

  getApiForSlide: "/api/go-captcha-data/slide-basic",
  checkApiForSlide: "/api/go-captcha-check-data/slide-basic",

  getApiForSlideRegion: "/api/go-captcha-data/slide-region",
  checkApiForSlideRegion: "/api/go-captcha-check-data/slide-region"
}

@Injectable({
  providedIn: 'root'
})
export class ClickService {
  captKey = ''

  constructor(private toast: HotToastService) {}

  requestData (callback: (res: any) => void) {
    Axios({
      method: 'get',
      url: apiPaths.getApiForClickText,
    }).then((response)=>{
      const {data = {}} = response;
      // @ts-ignore
      if (!Lodash.isEmpty(data) && (data['code'] || 0) === 0) {
        this.captKey = data['captcha_key'] || ''
        callback && callback({
          image: data['image_base64'] || '',
          thumb: data['thumb_base64'] || ''
        })
      } else {
        this.toast.error(`get data failed`)
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }

  confirmData(dots: any, callback: () => void) {
    const dotArr = []
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i]
      dotArr.push(dot.x, dot.y)
    }

    Axios({
      method: 'post',
      url: apiPaths.checkApiForClickText,
      data: Qs.stringify({
        dots: dotArr.join(','),
        key: this.captKey || ''
      }),
    }).then((response)=>{
      const {data = {}} = response;
      if ((data['code'] || 0) === 0) {
        this.toast.success(`check data success`)
      } else {
        this.toast.error(`check data failed`)
      }

      callback && callback()
    }).catch((e)=>{
      console.warn(e)
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  captKey = ''

  constructor(private toast: HotToastService) {}

  requestData (callback: (res: any) => void) {
    Axios({
      method: 'get',
      url: apiPaths.getApiForSlide,
    }).then((response)=>{
      const {data = {}} = response;
      // @ts-ignore
      if (!Lodash.isEmpty(data) && (data['code'] || 0) === 0) {
        this.captKey = data['captcha_key'] || ''
        callback && callback({
          image: data['image_base64'] || '',
          thumb: data['tile_base64'] || '',
          captKey: data['captcha_key'] || '',
          thumbX: data['tile_x'] || 0,
          thumbY: data['tile_y'] || 0,
          thumbWidth: data['tile_width'] || 0,
          thumbHeight: data['tile_height'] || 0
        })
      } else {
        this.toast.error(`get data failed`)
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }

  confirmData(point: any, callback: () => void) {
    Axios({
      method: 'post',
      url: apiPaths.checkApiForSlide,
      data: Qs.stringify({
        point: [point.x, point.y].join(','),
        key: this.captKey || ''
      }),
    }).then((response)=>{
      const {data = {}} = response;
      if ((data['code'] || 0) === 0) {
        this.toast.success(`check data success`)
      } else {
        this.toast.error(`check data failed`)
      }

      callback && callback()
    }).catch((e)=>{
      console.warn(e)
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class SlideRegionService {
  captKey = ''

  constructor(private toast: HotToastService) {}

  requestData (callback: (res: any) => void) {
    Axios({
      method: 'get',
      url: apiPaths.getApiForSlideRegion,
    }).then((response)=>{
      const {data = {}} = response;
      // @ts-ignore
      if (!Lodash.isEmpty(data) && (data['code'] || 0) === 0) {
        this.captKey = data['captcha_key'] || ''
        callback && callback({
          image: data['image_base64'] || '',
          thumb: data['tile_base64'] || '',
          captKey: data['captcha_key'] || '',
          thumbX: data['tile_x'] || 0,
          thumbY: data['tile_y'] || 0,
          thumbWidth: data['tile_width'] || 0,
          thumbHeight: data['tile_height'] || 0
        })
      } else {
        this.toast.error(`get data failed`)
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }

  confirmData(point: any, callback: () => void) {
    Axios({
      method: 'post',
      url: apiPaths.checkApiForSlideRegion,
      data: Qs.stringify({
        point: [point.x, point.y].join(','),
        key: this.captKey || ''
      }),
    }).then((response)=>{
      const {data = {}} = response;
      if ((data['code'] || 0) === 0) {
        this.toast.success(`check data success`)
      } else {
        this.toast.error(`check data failed`)
      }

      callback && callback()
    }).catch((e)=>{
      console.warn(e)
    })
  }
}


@Injectable({
  providedIn: 'root'
})
export class RotateService {
  captKey = ''

  constructor(private toast: HotToastService) {}

  requestData (callback: (res: any) => void) {
    Axios({
      method: 'get',
      url: apiPaths.getApiForRotate,
    }).then((response)=>{
      const {data = {}} = response;
      // @ts-ignore
      if (!Lodash.isEmpty(data) && (data['code'] || 0) === 0) {
        this.captKey = data['captcha_key'] || ''
        callback && callback({
          image: data['image_base64'] || '',
          thumb: data['thumb_base64'] || '',
        })
      } else {
        this.toast.error(`get data failed`)
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }

  confirmData(angle: any, callback: () => void) {
    Axios({
      method: 'post',
      url: apiPaths.checkApiForRotate,
      data: Qs.stringify({
        angle: angle,
        key: this.captKey || ''
      }),
    }).then((response)=>{
      const {data = {}} = response;
      if ((data['code'] || 0) === 0) {
        this.toast.success(`check data success`)
      } else {
        this.toast.error(`check data failed`)
      }

      callback && callback()
    }).catch((e)=>{
      console.warn(e)
    })
  }
}
