import { Routes } from '@angular/router';
import {BasketComponent} from './shared/components/basket/basket.component';
import {HomeSectionComponent} from './shared/components/home-section/home-section.component';
import {DetailedProductComponent} from './shared/components/detailed-product/detailed-product.component';
import {AuthLayoutComponent} from './shared/components/auth-layout/auth-layout.component';
import {SignUpComponent} from './shared/components/sign-up/sign-up.component';
import {LogInComponent} from './shared/components/log-in/log-in.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {SubcategoryResultsComponent} from './shared/components/subcategory-results/subcategory-results.component';
import {
  SubcategoryOptionSelectorComponent
} from './shared/components/subcategory-option-selector/subcategory-option-selector.component';

export const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
      { path: '', component: HomeSectionComponent},
      { path: 'offers', component: SubcategoryResultsComponent },
      { path: 'building', component: SubcategoryOptionSelectorComponent},
      { path: 'heating', component: SubcategoryOptionSelectorComponent },
      { path: 'lighting', component: SubcategoryOptionSelectorComponent },
      { path: 'painting', component: SubcategoryOptionSelectorComponent },
      { path: 'tools', component: SubcategoryOptionSelectorComponent },
      { path: 'new', component: SubcategoryOptionSelectorComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'product/:id', component: DetailedProductComponent },
      { path: 'search-subcategory', component:  SubcategoryResultsComponent }
    ]
  },
  { path: '', component: AuthLayoutComponent, children: [
      {path: 'sign-up', component: SignUpComponent},
      {path: 'log-in', component: LogInComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
