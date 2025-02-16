import {Component, ViewChild} from '@angular/core';
// @ts-ignore
import Lodash from 'lodash';
import Axios from 'axios'
// @ts-ignore
import Qs from 'qs'
import {ClickService, RotateService, SlideRegionService, SlideService} from "./app.service";
import {ClickRef} from "go-captcha-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private clickService: ClickService,
    private slideService: SlideService,
    private slideRegionService: SlideRegionService,
    private rotateService: RotateService,
  ) {}

  ngAfterViewInit() {
    this.requestClickData()
    this.requestSlideData()
    this.requestSlideRegionData()
    this.requestRotateData()
  }

  ////////////////////////////////////
  clickData = {
    image: '',
    thumb: '',
  }

  clickConfig = {
    width: 300,
    height: 220,
  }

  clickEvents = {
    click: (x: number, y: number): void => {
      console.log("click >>>>>>>", x, y)
    },
    confirm: (dot: any, reset: Function) => {
      this.confirmClickEvent(dot, reset)
    },
    refresh: () => {
      this.requestClickData()
    },
    close: (): void => {
      console.log("close >>>>>>>")
    }
  }

  @ViewChild('clickRef') clickRef: ClickRef | any;

  confirmClickEvent(dot: any, reset: Function) {
    this.clickService.confirmData(dot, () => {
      setTimeout(() => {
        this.requestClickData()
      }, 1000)
    })
  }

  requestClickData(){
    this.clickRef.clear && this.clickRef.clear()
    this.clickService.requestData((res) => {
      this.clickData.image = res.image
      this.clickData.thumb = res.thumb
    })
  }

  /////////////////////////////////////////

  slideData = {
    thumbX: 20,
    thumbY: 20,
    thumbWidth: 0,
    thumbHeight: 0,
    image: '',
    thumb: '',
  }

  slideConfig = {
    width: 300,
    height: 220,
  }

  slideEvents = {
    move: (x: number, y: number): void => {
      console.log("move >>>>>>>", x, y)
    },
    confirm: (point: any, reset: Function) => {
      this.confirmSlideEvent(point, reset)
    },
    refresh: () => {
      this.requestSlideData()
    },
    close: (): void => {
      console.log("close >>>>>>>")
    }
  }

  @ViewChild('slideRef') slideRef: any;

  confirmSlideEvent(point: any, reset: Function) {
    this.slideService.confirmData(point, () => {
      setTimeout(() => {
        this.requestSlideData()
      }, 1000)
    })
  }

  requestSlideData(){
    this.slideRef.clear && this.slideRef.clear()
    this.slideService.requestData((res) => {
      this.slideData.thumbX = res.thumbX
      this.slideData.thumbY = res.thumbY
      this.slideData.thumbWidth = res.thumbWidth
      this.slideData.thumbHeight = res.thumbHeight
      this.slideData.image = res.image
      this.slideData.thumb = res.thumb

      // this.slideData = {
      //   image: res.image,
      //   thumb: res.thumb,
      //   thumbX: res.thumbX,
      //   thumbY: res.thumbY,
      //   thumbWidth: res.thumbWidth,
      //   thumbHeight: res.thumbHeight,
      // }
    })
  }

  ////////////////////////////////

  slideRegionData = {
    thumbX: 20,
    thumbY: 20,
    thumbWidth: 80,
    thumbHeight: 80,
    image: '',
    thumb: '',
  }
  slideRegionEvents = {
    move: (x: number, y: number): void => {
      console.log("move >>>>>>>", x, y)
    },
    confirm: (point: any, reset: Function) => {
      this.confirmSlideRegionEvent(point, reset)
    },
    refresh: () => {
      this.requestSlideRegionData()
    },
    close: (): void => {
      console.log("close >>>>>>>")
    }
  }

  slideRegionConfig = {
    width: 300,
    height: 220,
  }

  @ViewChild('slideRegionRef') slideRegionRef: any;

  confirmSlideRegionEvent(point: any, reset: Function) {
    this.slideRegionService.confirmData(point, () => {
      setTimeout(() => {
        this.requestSlideRegionData()
      }, 1000)
    })
  }

  requestSlideRegionData(){
    this.slideRegionRef.clear && this.slideRegionRef.clear()
    this.slideRegionService.requestData((res) => {
      this.slideRegionData.thumbX = res.thumbX
      this.slideRegionData.thumbY = res.thumbY
      this.slideRegionData.thumbWidth = res.thumbWidth
      this.slideRegionData.thumbHeight = res.thumbHeight
      this.slideRegionData.image = res.image
      this.slideRegionData.thumb = res.thumb
    })
  }

  ////////////////////////////////
  rotateData = {
    image: '',
    thumb: '',
    thumbSize: 0,
  }

  rotateEvents = {
    rotate: (angle: number): void => {
      console.log("rotate >>>>>>>", angle)
    },
    confirm: (dot: any, reset: Function) => {
      this.confirmRotateEvent(dot, reset)
    },
    refresh: () => {
      this.requestRotateData()
    },
    close: (): void => {
      console.log("close >>>>>>>")
    }
  }

  rotateConfig = {
    width: 300,
    height: 220,
  }

  @ViewChild('rotateRef') rotateRef: any;

  confirmRotateEvent(dot: any, reset: Function) {
    this.rotateService.confirmData(dot, () => {
      setTimeout(() => {
        this.requestRotateData()
      }, 1000)
    })
  }

  requestRotateData(){
    this.rotateRef.clear && this.rotateRef.clear()
    this.rotateService.requestData((res) => {
      this.rotateData.image = res.image
      this.rotateData.thumb = res.thumb
      this.rotateData.thumbSize = res.thumbSize || 0
    })
  }

  handleEvent() {
    console.log(">>>>>> click")
  }
}
