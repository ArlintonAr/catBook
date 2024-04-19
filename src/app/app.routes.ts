import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'books',
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
    path: '**',
    redirectTo: '/books',
    pathMatch: 'full'
  }
];
