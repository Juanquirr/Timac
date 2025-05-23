import { Component } from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {FooterComponent} from "../../footer/footer.component";
import {IonContent} from "@ionic/angular/standalone";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-layout-default',
  standalone: true,
  templateUrl: './default.component.html',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    IonContent
  ],
})

export class DefaultComponent {}
