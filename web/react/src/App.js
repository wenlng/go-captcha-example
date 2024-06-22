import React from 'react'
import './App.css';
import 'antd/dist/antd.min.css';
import ClickTextCapt from "./components/ClickTextCapt";
import ClickShapeCapt from "./components/ClickShapeCapt";
import SlideCapt from "./components/SlideCapt";
import SlideRegionCapt from "./components/SlideRegionCapt";
import RotateCapt from "./components/RotateCapt";
import {useGithub} from "./hooks/useGithub";

function App() {
  useGithub()

  return (
    <div className="container">
      <div style={{marginTop: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}><ClickTextCapt/></div>
      <div style={{marginTop: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}><ClickShapeCapt/></div>
      <div style={{marginTop: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}><SlideCapt/></div>
      <div style={{marginTop: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}><SlideRegionCapt/></div>
      <div style={{marginTop: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}><RotateCapt/></div>

      <div className="cap-tip">
        <a href="https://github.com/wenlng/go-captcha/releases">
          <img src="https://img.shields.io/github/tag/wenlng/go-captcha.svg" alt="version"/>
        </a>
        <a className="github-button" href="https://github.com/wenlng/go-captcha" data-size="large"
           data-show-count="true" aria-label="Star wenlng/go-captcha on GitHub">Star</a>
        <a className="github-button" href="https://github.com/wenlng/go-captcha/fork" data-size="large"
           data-show-count="true" aria-label="Fork wenlng/go-captcha on GitHub">Fork</a>
      </div>
    </div>
  );
}

export default App;
