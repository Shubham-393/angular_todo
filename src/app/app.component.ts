import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoFormComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
  angularVersion = '19.2.19';
  editingTodo: Todo | null = null;

  // Receive edit event from todo-list component
  onEditingTodo(todo: Todo): void {
    this.editingTodo = todo;
    // Scroll to form (optional)
    setTimeout(() => {
      document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  // Handle operation completion (create/update)
  onOperationComplete(): void {
    this.editingTodo = null;
  }
}

