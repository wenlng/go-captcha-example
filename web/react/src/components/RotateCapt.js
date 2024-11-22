import React, {useRef} from 'react'
import GoCaptcha from 'go-captcha-react'
// Cache Testing
// import GoCaptcha from '../cache'
import { Popover } from 'antd';
import {useRotateHandler} from "../hooks/useRotateHandler";

function RotateCapt() {
  const domRef = useRef(null)

  const handler = useRotateHandler(domRef, {
    getApi: "/api/go-captcha-data/rotate-basic",
    checkApi: "/api/go-captcha-check-data/rotate-basic"
  })

  return (
    <Popover
      content={
        <GoCaptcha.Rotate
          config={{
            width: 300,
            height: 220,
            size: 220,
            showTheme: false,
            verticalPadding: 5,
            horizontalPadding: 5,
          }}
          data={handler.data}
          events={{
            close: handler.closeEvent,
            refresh: handler.refreshEvent,
            confirm: handler.confirmEvent,
          }}
          ref={domRef}
        />
      }
      open={handler.state.popoverVisible}
      onOpenChange={handler.visibleChangeEvent}
      forceRender={true}
      trigger="click">
      <GoCaptcha.Button {...handler.state} clickEvent={handler.clickEvent} title={"点击进行滑动旋转校验"}/>
    </Popover>
  );
}

export default RotateCapt;
