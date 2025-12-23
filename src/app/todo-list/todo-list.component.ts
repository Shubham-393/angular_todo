import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  // Observable to get todos from service (following reactive programming pattern)
  todos$!: Observable<Todo[]>;

  // Emit event when user wants to edit a todo
  @Output() editingTodo = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // Subscribe to todos observable
    this.todos$ = this.todoService.getTodos();
  }

  // Toggle todo completion status
  toggleTodo(id: number | string): void {
    this.todoService.toggleTodo(id).subscribe();
  }

  // Delete a todo
  deleteTodo(id: number | string): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe();
    }
  }

  // Emit event to parent to edit todo
  editTodo(todo: Todo): void {
    this.editingTodo.emit(todo);
  }

  // Delete all completed todos
  clearCompleted(): void {
    if (confirm('Delete all completed todos?')) {
      this.todoService.deleteCompleted().subscribe();
    }
  }

  // Get count of active todos
  getActiveTodosCount(): number {
    return this.todoService.getActiveTodosCount();
  }

  // Get count of completed todos
  getCompletedTodosCount(): number {
    return this.todoService.getCompletedTodosCount();
  }
}
