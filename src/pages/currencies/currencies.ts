import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';
// // import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';
// import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-currencies',
  templateUrl: 'currencies.html'
})
export class CurrenciesPage {
  currenciesArr = [];
  currency:any;
  result:any;
  show:boolean=false;

  constructor( public navCtrl: NavController,
               public http: Http
    ) {
    
  }

  getCurrencies() {
    let date = new Date();
    // console.log(date.getDay()+date.Month()+date.getFullYear());
    let link = 'https://api.privatbank.ua/p24api/exchange_rates?json&date='+date.getDay()+'.'+date.getMonth()+'.'+date.getFullYear();
    this.http.get(link).subscribe(data => {
      console.log(data.json());
      this.currenciesArr = data.json().exchangeRate;
      console.log(this.currenciesArr);
      this.show =true;
    });
  }

  onChange() {
    console.log('currency',this.currency);
    this.result = this.currenciesArr[this.currency].saleRateNB;
  }

  ngOnInit(){
    this.getCurrencies();
  }
}
