import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {IonContent} from "@ionic/angular/standalone";

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [RouterOutlet, RouterLink, IonContent],
})
export class AuthComponent {}

