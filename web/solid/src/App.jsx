import {createSignal, onMount} from 'solid-js';
import GoCaptcha from 'go-captcha-solid';
// Testing Cache
// import GoCaptcha from '../cache';
import {useClickHandler} from "./hooks/useClickHandler";
import {useRotateHandler} from "./hooks/useRotateHandler";
import {useSlideHandler} from "./hooks/useSlideHandler";
import { Toaster } from 'solid-toast';

function App() {
  let clickRef;
  const clickHandler = useClickHandler({
    getApi: "/api/go-captcha-data/click-basic",
    checkApi: "/api/go-captcha-check-data/click-basic",
  })

  let slideRef;
  const slideHandler = useSlideHandler({
    getApi: "/api/go-captcha-data/slide-basic",
    checkApi: "/api/go-captcha-check-data/slide-basic",
  })

  let slideRegionRef;
  const slideRegionHandler = useSlideHandler({
    getApi: "/api/go-captcha-data/slide-region",
    checkApi: "/api/go-captcha-check-data/slide-region"
  })

  let rotateRef;
  const rotateHandler = useRotateHandler({
    getApi: "/api/go-captcha-data/rotate-basic",
    checkApi: "/api/go-captcha-check-data/rotate-basic",
  })


  onMount(() => {
    clickHandler.init(clickRef)
    slideHandler.init(slideRef)
    slideRegionHandler.init(slideRegionRef)
    rotateHandler.init(rotateRef)
  })

  const [typeValue, setTypeValue]= createSignal("default")
  const [widthValue, setWidthValue]= createSignal(300)

  return (
    <div style={{
      "margin-top": "60px",
      "display": "flex",
      "flex-direction": "column",
      "align-items": "center",
    }}>
      <Toaster />

      <GoCaptcha.Click
        data={clickHandler.data()}
        events={{
          click(x, y) {
            console.log("click >>>>>>>", x, y)
          },
          confirm(dots, reset) {
            console.log("dots >>>>>>>", dots)
            clickHandler.confirmEvent(dots)
          },
          refresh() {
            console.log("refresh >>>>>>>")
            clickHandler.refreshEvent()
            // clickRef.clear && clickRef.clear()
          },
          close() {
            console.log("close >>>>>>>")
          }
        }}
        ref={clickRef}
      />
      <br />
      <GoCaptcha.Slide
        data={slideHandler.data()}
        events={{
          move(x, y) {
            console.log("move >>>>>>>", x, y)
          },
          confirm(point, reset) {
            console.log("point >>>>>>>", point)

            slideHandler.confirmEvent(point)
          },
          refresh() {
            console.log("refresh >>>>>>>")
            slideHandler.refreshEvent()
            // slideRef.clear && slideRef.clear()
          },
          close() {
            console.log("close >>>>>>>")
          }
        }}
        ref={slideRef}
      />
      <br />
      <GoCaptcha.SlideRegion
        data={slideRegionHandler.data()}
        events={{
          move(x, y) {
            console.log("move >>>>>>>", x, y)
          },
          confirm(point, reset) {
            console.log("point >>>>>>>", point)
            slideRegionHandler.confirmEvent(point)
          },
          refresh() {
            console.log("refresh >>>>>>>")
            // slideRegionRef.clear && slideRegionRef.clear()
            slideRegionHandler.refreshEvent()
          },
          close() {
            console.log("close >>>>>>>")
          }
        }}
        ref={slideRegionRef}
      />
      <br />
      <GoCaptcha.Rotate
        data={rotateHandler.data()}
        events={{
          rotate(angle) {
            console.log("rotate >>>>>>>", angle)
          },
          refresh() {
            console.log("refresh >>>>>>>")
            // rotateRef.clear && rotateRef.clear()
            rotateHandler.refreshEvent()
          },
          confirm(point, reset) {
            console.log("point >>>>>>>", point)

            setTimeout(() => {
              reset()
            }, 2000)
            rotateHandler.confirmEvent(point)
          },
          close() {
            console.log("close >>>>>>>")
          }
        }}
        ref={rotateRef}
      />
      <br />
      <GoCaptcha.Button
        config={{
          width: widthValue()
        }}
        type={typeValue()}
        clickEvent={() => console.log('hello')}
      />
      <br />
      <br />
    </div>
  );
}

export default App;
