import React, {useRef} from 'react'
import GoCaptcha from 'go-captcha-react'
// Cache Testing
// import GoCaptcha from '../cache'
import {useClickHandler} from "../hooks/useClickHandler";

function ClickTextCapt() {
  const domRef = useRef(null)

  const handler = useClickHandler(domRef, {
    getApi: "/api/go-captcha-data/click-basic",
    checkApi: "/api/go-captcha-check-data/click-basic"
  })

  return (
    <GoCaptcha.Click
      config={{
        width: 300,
        height: 220,
        dotSize: 24,
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

export default ClickTextCapt;
