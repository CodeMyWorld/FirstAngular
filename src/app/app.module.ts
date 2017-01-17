import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ClickMeComponent } from './click-me/click-me.component';
import { HttpServiceService } from './http-service.service';
import {CurrencyService} from './currency/service/currency.service';
import { CurrencyComponent } from './currency/component/currency.component'

@NgModule({
  declarations: [
    AppComponent,
    ClickMeComponent,
    CurrencyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [HttpServiceService, CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
