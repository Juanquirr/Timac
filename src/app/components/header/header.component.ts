import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    RouterLink,
    FormsModule,
    IonicModule,
    NgIf
  ],
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isLoggedIn = false; // Mario Service
  showMenu = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.showMenu = false;
    // Mario service
  }
}
