import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ClickService, SlideService, RotateService } from './app.service';
import { GoCaptchaModule } from 'go-captcha-angular';

// Cache Testing
// @ts-ignore
// import { GoCaptchaModule } from '../cache';

import { AppComponent } from './app.component';
import axios from 'axios'
import { provideHotToastConfig } from '@ngxpert/hot-toast';

axios.defaults.baseURL = 'http://47.104.180.148:8081/';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GoCaptchaModule
  ],
  providers: [
    ClickService,
    SlideService,
    RotateService,
    provideHotToastConfig(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
