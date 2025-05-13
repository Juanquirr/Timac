import { Component } from '@angular/core';
import { IonHeader, IonContent } from '@ionic/angular/standalone';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonContent, HeaderComponent, FooterComponent],
})
export class HomePage {
  constructor() {}
}
