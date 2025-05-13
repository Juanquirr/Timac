import { Component } from '@angular/core';
import {IonContent} from '@ionic/angular/standalone';
import {ProductDisplayComponent} from "../../components/product-display/product-display.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, ProductDisplayComponent],
})

export class HomePage {}
