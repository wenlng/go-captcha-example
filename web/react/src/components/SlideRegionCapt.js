import React, {useRef} from 'react'
import GoCaptcha from 'go-captcha-react'
// Cache Testing
// import GoCaptcha from '../cache'
import {useSlideHandler} from "../hooks/useSlideHandler";

function SlideRegionCapt() {
  const domRef = useRef(null)

  const handler = useSlideHandler(domRef, {
    getApi: "/api/go-captcha-data/slide-region",
    checkApi: "/api/go-captcha-check-data/slide-region"
  })

  return (
    <GoCaptcha.SlideRegion
      config={{
        width: 300,
        height: 220,
      }}
      data={handler.data}
      events={{
        close: handler.closeEvent,
        refresh: handler.refreshEvent,
        confirm: handler.confirmEvent,
      }}
      ref={domRef}
    />
  );
}

export default SlideRegionCapt;
