import { Routes } from '@angular/router';
import { DefaultComponent } from './components/layouts/default/default.component';
import { AuthComponent } from './components/layouts/auth/auth.component';


export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites.page').then((m) => m.FavoritesPage),
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./pages/detailed-product/detailed-product.page').then((m) => m.DetailedProductPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
      },
    ],
  },
];
