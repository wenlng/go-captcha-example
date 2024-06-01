import React from 'react'
import GoCaptcha from 'go-captcha-react'
import { Popover } from 'antd';
import {useClickHandler} from "../hooks/useClickHandler";

function ClickShapeCapt() {
  const handler = useClickHandler({
    getApi: "/api/go-captcha-data/click-shape",
    checkApi: "/api/go-captcha-check-data/click-shape"
  })

  return (
    <Popover
      content={
        <GoCaptcha.Click
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
      <GoCaptcha.Button {...handler.state} clickEvent={handler.clickEvent} title={"点击进行图形点选校验"}/>
    </Popover>
  );
}

export default ClickShapeCapt;
