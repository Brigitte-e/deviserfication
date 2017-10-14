import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BestChoicePage } from '../pages/best_choice/best_choice';
import { MaxRiskPage } from '../pages/diversificate/max_risk/max_risk';
import { MinRiskPage } from '../pages/diversificate/min_risk/min_risk';
import { DiversificatePage } from '../pages/diversificate/diversificate';
import { CurrenciesPage } from '../pages/currencies/currencies';
// import { URLSearchParams } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BestChoicePage,
    MaxRiskPage,
    MinRiskPage,
    DiversificatePage,
    CurrenciesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    // URLSearchParams
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BestChoicePage,
    MaxRiskPage,
    MinRiskPage,
    DiversificatePage,
    CurrenciesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
