import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonItem, IonList
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem]
})
export class FavoritesPage implements OnInit {
  totalItems: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {  }
}
