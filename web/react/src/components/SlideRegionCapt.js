import React from 'react'
import GoCaptcha from 'go-captcha-react'
import { Popover } from 'antd';
import {useSlideHandler} from "../hooks/useSlideHandler";

function SlideRegionCapt() {
  const handler = useSlideHandler({
    getApi: "/api/go-captcha-data/slide-region",
    checkApi: "/api/go-captcha-check-data/slide-region"
  })

  return (
    <Popover
      content={
        <GoCaptcha.SlideRegion
          config={{
            width: 300,
            height: 240,
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
