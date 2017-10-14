import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-best-choice',
  templateUrl: 'best_choice.html'
})
export class BestChoicePage {
  //currencyStatistic = [
    // {
    // 	'currency': 'USD',
    // 	'affluence': '0.003%',
    // 	'risk': '0.0005%'
    // },
    // {
    // 	'currency': 'USD',
    // 	'affluence': '0.003%',
    // 	'risk': '0.0005%'
    // },
    // {
    // 	'currency': 'USD',
    // 	'affluence': '0.003%',
    // 	'risk': '0.0005%'
    // }
 // ]
 riskStatistic = new Array(); 
 totalStatistic = new Array(); 


  constructor(
    public navCtrl: NavController,
    public http: Http
    ) {
    this.getData();
  }

  getData() {
    let link = 'https://serene-chamber-50995.herokuapp.com/api/statistics/';
    this.http.get(link).subscribe(data => {
      console.log(data.json());
      this.totalStatistic = data.json().totalavg;
      this.riskStatistic = data.json().risk;
    });
  }

}
