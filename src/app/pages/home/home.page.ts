import { Component } from '@angular/core';
import {ProductDisplayComponent} from "../../components/product-display/product-display.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ProductDisplayComponent],
})

export class HomePage {}
