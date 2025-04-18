import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [ RouterOutlet ],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {}
