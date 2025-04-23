import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    NgIf,
    RouterLink

  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  areLoginButtonsDisplaying: boolean = false;

  constructor(private authService: AuthService) {}

  toggleLoginButtons(): void {
    this.areLoginButtonsDisplaying = !this.areLoginButtonsDisplaying;
  }

  checkLoginStatus(){
    return !!this.authService.getCurrentUser();
  }

  handleLogout() {
    this.authService.logout();
  }
}
