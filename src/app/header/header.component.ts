import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    NgIf

  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  areLoginButtonsDisplaying: boolean = false;

  toggleLoginButtons(): void {
    this.areLoginButtonsDisplaying = !this.areLoginButtonsDisplaying;
  }

}
