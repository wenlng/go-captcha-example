import React, {useRef} from 'react'
import GoCaptcha from 'go-captcha-react'
// Cache Testing
// import GoCaptcha from '../cache'
import { Popover } from 'antd';
import {useSlideHandler} from "../hooks/useSlideHandler";

function SlideRegionCapt() {
  const domRef = useRef(null)

  const handler = useSlideHandler(domRef, {
    getApi: "/api/go-captcha-data/slide-region",
    checkApi: "/api/go-captcha-check-data/slide-region"
  })

  return (
    <Popover
      content={
        <GoCaptcha.SlideRegion
          config={{
            width: 300,
            height: 220,
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
      <GoCaptcha.Button {...handler.state} clickEvent={handler.clickEvent} title={"点击进行区域滑动校验"}/>
    </Popover>
  );
}

export default SlideRegionCapt;
