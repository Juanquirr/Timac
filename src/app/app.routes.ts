import { Routes } from '@angular/router';
import {BasketComponent} from './basket/basket.component';
import {HomeSectionComponent} from './home-section/home-section.component';
import {DetailedProductComponent} from './detailed-product/detailed-product.component';

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
  { path: '**', redirectTo: '' }
];
