import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import {HomeSectionComponent} from './home-section/home-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HomeSectionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
