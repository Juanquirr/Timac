import { Routes } from '@angular/router';
import {BasketComponent} from './components/basket/basket.component';
import {HomeSectionComponent} from './components/home-section/home-section.component';
import {DetailedProductComponent} from './components/detailed-product/detailed-product.component';
import {AuthLayoutComponent} from './components/auth-layout/auth-layout.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
      { path: '', component: HomeSectionComponent},
      { path: 'offers', component: HomeSectionComponent },
      { path: 'building', component: HomeSectionComponent },
      { path: 'heating', component: HomeSectionComponent },
      { path: 'lighting', component: HomeSectionComponent },
      { path: 'painting', component: HomeSectionComponent },
      { path: 'tools', component: HomeSectionComponent },
      { path: 'trending', component: HomeSectionComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'product/:id', component: DetailedProductComponent },
    ]
  },
  { path: '', component: AuthLayoutComponent, children: [
      {path: 'sign-up', component: SignUpComponent},
      {path: 'log-in', component: LogInComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
