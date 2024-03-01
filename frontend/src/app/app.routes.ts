import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos',
    loadChildren: () =>
      import('./todos/todo.routes').then((c) => c.TODO_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((c) => c.AUTH_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
