import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-diversificate',
  templateUrl: 'diversificate.html'
})
export class DiversificatePage {
  tabStatus:string = 'minRisk';
  currency:any;

  constructor(public navCtrl: NavController) {
  }

  openTab(status) {
  	this.tabStatus = status;
  }

  onChange() {
  	console.log(this.currency);
  }
}
