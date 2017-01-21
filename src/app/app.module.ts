import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ClickMeComponent } from './click-me/click-me.component';
import { HttpServiceService } from './http-service.service';
import {CurrencyService} from './currency/service/currency.service';
import { CurrencyComponent } from './currency/component/currency.component';
import { MaterialModule, MdSnackBar, MdDialogRef} from '@angular/material';
import { AddComponent } from './currency/component/add.component'
import { RouterModule, Routes } from '@angular/router';
import { RateComponent } from './rate/component/rate.component';
import { RateService } from './rate/service/rate.service';
import { CurrenciesComponent } from './currency/component/currencies.component'



const appRoutes: Routes = [
  {path: '', component: RateComponent},
  {path: 'add', component: AddComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ClickMeComponent,
    CurrencyComponent,
    AddComponent,
    RateComponent,
    CurrenciesComponent
  ],
  entryComponents: [
    CurrenciesComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpServiceService, CurrencyService, MdSnackBar, RateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
