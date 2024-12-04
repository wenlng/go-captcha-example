import React, {useRef} from 'react'
import GoCaptcha from 'go-captcha-react'
// Cache Testing
// import GoCaptcha from '../cache'
import {useRotateHandler} from "../hooks/useRotateHandler";

function RotateCapt() {
  const domRef = useRef(null)

  const handler = useRotateHandler(domRef, {
    getApi: "/api/go-captcha-data/rotate-basic",
    checkApi: "/api/go-captcha-check-data/rotate-basic"
  })

  return (
    <GoCaptcha.Rotate
      config={{
        width: 300,
        height: 220,
        size: 220,
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

export default RotateCapt;
