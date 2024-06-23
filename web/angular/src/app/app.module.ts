import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoCaptchaModule } from 'go-captcha-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GoCaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
