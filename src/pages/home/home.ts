import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurrenciesPage } from '../currencies/currencies'
import { BestChoicePage } from '../best_choice/best_choice';
import { DiversificatePage } from '../diversificate/diversificate';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  bestChoicePage = BestChoicePage;
  diversificatePage = DiversificatePage;
  currenciesPage = CurrenciesPage;

  constructor(public navCtrl: NavController) {

  }

  openPage(page: any): void {
    this.navCtrl.push(page);
  }

}
