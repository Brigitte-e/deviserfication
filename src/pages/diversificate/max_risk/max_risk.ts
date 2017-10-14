import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-max-risk',
  templateUrl: 'max_risk.html'
})
export class MaxRiskPage {
  currency:any;

  constructor(public navCtrl: NavController) {

  }

  onChange() {
  	console.log("currency ",this.currency);
  }
}
