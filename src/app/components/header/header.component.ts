import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    NgIf,
    RouterLink,
    FormsModule

  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // areLoginButtonsDisplaying: boolean = false;
  // searchText: String = "";
  //
  // constructor(private authService: AuthService, private router: Router) {}
  //
  // toggleLoginButtons(): void {
  //   this.areLoginButtonsDisplaying = !this.areLoginButtonsDisplaying;
  // }
  //
  // checkLoginStatus(){
  //   return !!this.authService.getCurrentUser();
  // }
  //
  // handleLogout() {
  //   this.authService.logout().catch(error => console.error('Logout error: ', error));
  // }
  //
  // onSearch() {
  //   if (this.searchText.length < 1) {
  //     return;
  //   }
  //   this.router.navigate(['/search-subcategory'], {
  //     queryParams: { query: this.searchText }
  //   });
  // }
}
