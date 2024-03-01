import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

export const TODO_ROUTES: Routes = [
  { path: 'details', component: TodoDetailsComponent },
  { path: 'edit/:id', component: TodoDetailsComponent },
  { path: '', component: TodoListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
