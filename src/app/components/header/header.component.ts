import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { NgIf } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";

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

export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  showMenu = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.showMenu = false;
    });
  }
}
