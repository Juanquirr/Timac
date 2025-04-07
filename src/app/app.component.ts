import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import {HomeSectionComponent} from './home-section/home-section.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HomeSectionComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
