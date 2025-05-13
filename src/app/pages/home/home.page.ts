import { Component } from '@angular/core';
import {IonHeader, IonContent, IonFooter} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {ProductDisplayComponent} from "../../components/product-display/product-display.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader,  IonContent, HeaderComponent, FooterComponent, ProductDisplayComponent, IonFooter],
})
export class HomePage {
  constructor() {}
}
