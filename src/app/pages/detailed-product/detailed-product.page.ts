import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detailed-product',
  templateUrl: './detailed-product.page.html',
  styleUrls: ['./detailed-product.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailedProductPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
