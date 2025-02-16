
<template>
  <div id="captcha" ref="captcha"></div>
</template>

<script>
///////////////////////////////////////////////////////////
/*
Since Vue officially no longer supports the maintenance of Vue2,
we have not included Vue versions lower than 2.7 in the development plan.
This example demonstrates the solution using the JS native library method.
 */
///////////////////////////////////////////////////////////
import GoCaptcha from "go-captcha-jslib";
import axios from 'axios'
import Qs from 'qs'

const getDataApi = "/api/go-captcha-data/slide-basic";
const checkDataApi = "/api/go-captcha-check-data/slide-basic";

export default {
  data() {
    return {
      captKey: '',
      capt: {}
    }
  },
  watch: {},
  computed: {},
  created() {
    // new GoCaptcha.Button()
    // new GoCaptcha.Click()
    // new GoCaptcha.Slide()
    // new GoCaptcha.SlideRegion()
    // new GoCaptcha.Rotate()

    this.capt = new GoCaptcha.Slide({
      width: 300,
      height: 220,
    })

    const self = this
    this.capt.setEvents({
      move(x,  y) {
        console.log('move - ', x, y)
      },
      confirm(point, reset) {
        self.confirmEvent(point)
      },
      refresh() {
        self.capt.clear()
        self.requestCaptchaData()
      },
      close() {
        console.log('>>>>> close')
      }
    })
    this.requestCaptchaData()
  },
  mounted() {
    // const el = document.getElementById("captcha");
    // this.capt.mount(el)

    this.capt.mount(this.$refs.captcha)
  },
  beforeMount() {
    this.capt.destroy()
  },
  methods: {
    confirmEvent(point) {
      axios({
        method: 'post',
        url: checkDataApi,
        data: Qs.stringify({
          point: [point.x, point.y].join(','),
          key: this.captKey || ''
        }),
      }).then((response) => {
        const data = response.data || {};
        if (data && (data['code'] || 0) === 0) {
          alert(`check data success`)
        } else {
          alert(`check data failed`)
        }

        setTimeout(() => {
          this.requestCaptchaData()
        }, 500)
      }).catch((e)=>{
        console.warn(e)
      })
    },
    requestCaptchaData() {
      this.capt.clear()
      this.captKey = ''
      axios({
        method: 'get',
        url: getDataApi,
      }).then((response) =>{
        const data = response.data || {};
        if (data && (data['code'] || 0) === 0) {
          this.capt.setData({
            image: data['image_base64'] || '',
            thumb: data['tile_base64'] || '',
            thumbX: data['tile_x'] || 0,
            thumbY: data['tile_y'] || 0,
            thumbWidth: data['tile_width'] || 0,
            thumbHeight: data['tile_height'] || 0,
          })

          this.captKey = data['captcha_key'] || ''
        } else {
          alert(`get data failed`)
        }
      }).catch((e)=>{
        console.warn(e)
      })
    }
  },
}
</script>

<style scoped>
/* css */
</style>
