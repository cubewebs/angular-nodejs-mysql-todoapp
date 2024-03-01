import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Todo } from '../todo.interface';
import { TodosService } from '../todos.service';
import { ProgressbarComponent } from '../../shared/components/progressbar/progressbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    DatePipe,
    ProgressbarComponent,
    RouterLink,
    NgClass,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  private _ts = inject(TodosService);
  private _cs = inject(ConfirmationService);
  private _ms = inject(MessageService);
  todos: Todo[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.loading = true;
    this._ts.getTodoList().subscribe((todos) => {
      if (todos) {
        this.todos = todos;
        this.loading = false;
      }
    });
  }

  deleteTodo(id: number, event: Event) {
    this._cs.confirm({
      target: event.target as EventTarget,
      message: `Are you sure you want to delete this task?`,
      icon: 'pi pi-exclamation-trinagle',
      accept: () => {
        this.loading = true;
        this._ts.deleteTodo(id).subscribe((data) => {
          this.getTodoList();
          this._ms.add({
            severity: 'success',
            summary: 'Success',
            detail: `The task with the id ${id} has been deleted successfully.`,
            life: 5000,
          });
        });
      },
      reject: () => {
        this._ms.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 5000,
        });
      },
    });
  }

  onDone(todo: Todo) {
    console.log(todo.done);
    if (todo.done == true) {
      const updateTodo = {
        ...todo,
        done_date: new Date(),
        done: false,
      };

      this._ts.editTodo(todo.id, updateTodo).subscribe((data) => {
        this.getTodoList();
        this._ms.add({
          severity: 'success',
          summary: 'Reactivated',
          detail: `The task with the id ${todo.id} has been activated successfully.`,
          life: 5000,
        });
      });
    } else {
      const updateTodo = {
        ...todo,
        done_date: new Date(),
        done: true,
      };

      this._ts.editTodo(todo.id, updateTodo).subscribe((data) => {
        this.getTodoList();
        this._ms.add({
          severity: 'success',
          summary: 'Done',
          detail: `The task with the id ${todo.id} has been done successfully.`,
          life: 5000,
        });
      });
    }
  }
}
