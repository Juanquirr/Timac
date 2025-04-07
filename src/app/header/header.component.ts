import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

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

  toggleLoginButtons(): void {
    this.areLoginButtonsDisplaying = !this.areLoginButtonsDisplaying;
  }

}
