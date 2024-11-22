import React, {useRef} from 'react'
import GoCaptcha from 'go-captcha-react'
// Cache Testing
// import GoCaptcha from '../cache'
import { Popover } from 'antd';
import {useClickHandler} from "../hooks/useClickHandler";

function ClickTextCapt() {
  const domRef = useRef(null)

  const handler = useClickHandler(domRef, {
    getApi: "/api/go-captcha-data/click-basic",
    checkApi: "/api/go-captcha-check-data/click-basic"
  })

  return (
    <Popover
      content={
        <GoCaptcha.Click
          config={{
            width: 300,
            height: 220,
            showTheme: false,
            verticalPadding: 5,
            horizontalPadding: 5,
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
      }
      open={handler.state.popoverVisible}
      onOpenChange={handler.visibleChangeEvent}
      forceRender={true}
      trigger="click">
      <GoCaptcha.Button {...handler.state} clickEvent={handler.clickEvent} title={"点击进行文本点选校验"}/>
    </Popover>
  );
}

export default ClickTextCapt;
