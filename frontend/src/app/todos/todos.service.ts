import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.endpoint;
  private apiTodos: string = 'api/todos/';
  constructor() {}

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl + this.apiTodos);
  }

  getTodo(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.apiTodos}/${id}`);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.apiTodos}${id}`);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}${this.apiTodos}`, todo);
  }

  editTodo(id: number, todo: Todo): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${this.apiTodos}/${id}`, todo);
  }
}
