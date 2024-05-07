import { Routes } from '@angular/router';
import { privateGuard } from './auth/guards/privateGuard.guard';
import { publicGuard } from './auth/guards/publicGuard.guard';




export const routes: Routes = [

  {
    path: 'books',
    canActivate: [privateGuard],
    loadComponent: () => import('./book/book.component'),
    children: [
      {
        path: 'list-books',
        title: 'Lista de Libros',
        loadComponent: () => import('./book/pages/list-books/list-books.component')

      },
      {
        path: 'my-books',
        title: 'Mis Libros',
        loadComponent: () => import('./book/pages/my-books/my-books.component')

      },
      {
        path: ':id',
        loadComponent: () => import('./book/pages/book/book.component')
      },
      {
        path: '', redirectTo: 'list-books', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    loadComponent: () => import('./auth/auth.component'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/pages/login-auth/login-auth.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/pages/register-auth/register-auth.component')
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];
