import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';

import { TodosService } from '../todos.service';
import { Todo } from '../todo.interface';
import { ProgressbarComponent } from '../../shared/components/progressbar/progressbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'todo-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    ButtonModule,
    ProgressbarComponent,
    ToastModule,
    ConfirmPopupModule,
    RouterLink,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css',
})
export class TodoDetailsComponent implements OnInit {
  private _ts = inject(TodosService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private _cs = inject(ConfirmationService);
  private _ms = inject(MessageService);
  private aRoute = inject(ActivatedRoute);
  id: number = 0;
  form: FormGroup;
  loading: boolean = false;
  operation: string = 'Add ';

  constructor() {
    this.form = this.fb.group({
      id: [null],
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(30)]],
      createdOn: [new Date(), [Validators.required]],
      todoDate: [null, [Validators.required]],
      doneDate: [null],
    });
  }

  ngOnInit(): void {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this.operation = 'Edit ';
      this.getTodo(this.id);
    }
    console.log(this.id);
  }

  onSubmit() {
    let todo: object = {
      title: this.form.value.title,
      description: this.form.value.description,
      created_on: this.form.value.createdOn,
      todo_date: this.form.value.todoDate,
      done_date: this.form.value.doneDate,
    };

    if (this.id != 0) {
      this.loading = true;
      this._ts.editTodo(this.id, todo as Todo).subscribe((data: Todo) => {
        if (data) {
          this._ms.add({
            severity: 'success',
            summary: 'Success',
            detail: `The task ${this.form.value.title} has been created successfully.`,
            life: 5000,
          });

          setTimeout(() => {
            console.log('Task added to database', data);
            this.router.navigate(['/']);
            this.loading = false;
          }, 1000);
        }
      });
    } else {
      this.loading = true;
      console.log(this.form.value);
      this._ts.addTodo(todo as Todo).subscribe((data) => {
        if (data) {
          this._ms.add({
            severity: 'success',
            summary: 'Success',
            detail: `The task ${this.form.value.title} has been created successfully.`,
            life: 5000,
          });

          setTimeout(() => {
            console.log('Task added to database', data);
            this.router.navigate(['/']);
            this.loading = false;
          }, 1000);
        }
      });
    }
  }

  getTodo(id: number) {
    this.loading = true;
    this._ts
      .getTodo(id)
      .subscribe(
        ({ id, title, description, created_on, todo_date, done_date }) => {
          console.log({
            id,
            title,
            description,
            created_on,
            todo_date,
            done_date,
          });

          this.form.reset({
            id,
            title,
            description,
            createdOn: new Date(created_on),
            todoDate: new Date(todo_date),
            doneDate: done_date == null ? null : new Date(done_date),
          });
          this.loading = false;
        }
      );
  }
}
