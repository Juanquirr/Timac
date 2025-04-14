import { Routes } from '@angular/router';
import {BasketComponent} from './basket/basket.component';
import {HomeSectionComponent} from './home-section/home-section.component';
import {DetailedProductComponent} from './detailed-product/detailed-product.component';
import {AuthLayoutComponent} from './auth-layout/auth-layout.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LogInComponent} from './log-in/log-in.component';

export const routes: Routes = [
  { path: '', component: HomeSectionComponent },
  { path: 'offers', component: HomeSectionComponent },
  { path: 'building', component: HomeSectionComponent },
  { path: 'heating', component: HomeSectionComponent },
  { path: 'lighting', component: HomeSectionComponent },
  { path: 'painting', component: HomeSectionComponent },
  { path: 'tools', component: HomeSectionComponent },
  { path: 'trending', component: HomeSectionComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'product/:id', component: DetailedProductComponent },
  { path: '', component: AuthLayoutComponent, children: [
      {path: 'sign-up', component: SignUpComponent},
      {path: 'log-in', component: LogInComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
