import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo, TodoCreate, TodoUpdate } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Using local storage for now - easy to replace with HTTP calls to backend
  private readonly STORAGE_KEY = 'todos';
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public todos$ = this.todosSubject.asObservable();

  constructor() {
    this.loadTodos();
  }

  // Load todos from localStorage
  private loadTodos(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const todos = JSON.parse(stored);
      this.todosSubject.next(todos);
    } else {
      this.todosSubject.next([]);
    }
  }

  // Save todos to localStorage
  private saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }

  // GET - Fetch all todos
  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  // GET - Fetch single todo by id
  getTodoById(id: number | string): Observable<Todo | undefined> {
    return new Observable(observer => {
      const todos = this.todosSubject.value;
      const todo = todos.find(t => t.id === id);
      observer.next(todo);
      observer.complete();
    });
  }

  // CREATE - Add new todo
  createTodo(todoCreate: TodoCreate): Observable<Todo> {
    return new Observable(observer => {
      const todos = this.todosSubject.value;
      const newTodo: Todo = {
        id: Date.now(), // Simple ID generation
        title: todoCreate.title,
        description: todoCreate.description,
        completed: false,
        createdAt: new Date()
      };
      todos.push(newTodo);
      this.saveTodos(todos);
      this.todosSubject.next([...todos]);
      observer.next(newTodo);
      observer.complete();
    });
  }

  // UPDATE - Modify existing todo
  updateTodo(id: number | string, todoUpdate: TodoUpdate): Observable<Todo | undefined> {
    return new Observable(observer => {
      const todos = this.todosSubject.value;
      const todoIndex = todos.findIndex(t => t.id === id);
      
      if (todoIndex === -1) {
        observer.next(undefined);
        observer.complete();
        return;
      }

      const updatedTodo: Todo = {
        ...todos[todoIndex],
        ...todoUpdate,
        id: todos[todoIndex].id, // Ensure id doesn't change
        createdAt: todos[todoIndex].createdAt // Ensure createdAt doesn't change
      };
      
      todos[todoIndex] = updatedTodo;
      this.saveTodos(todos);
      this.todosSubject.next([...todos]);
      observer.next(updatedTodo);
      observer.complete();
    });
  }

  // DELETE - Remove todo
  deleteTodo(id: number | string): Observable<boolean> {
    return new Observable(observer => {
      let todos = this.todosSubject.value;
      const initialLength = todos.length;
      todos = todos.filter(t => t.id !== id);
      
      const deleted = todos.length < initialLength;
      if (deleted) {
        this.saveTodos(todos);
        this.todosSubject.next([...todos]);
      }
      
      observer.next(deleted);
      observer.complete();
    });
  }

  // UTILITY - Toggle todo completion status
  toggleTodo(id: number | string): Observable<Todo | undefined> {
    const todos = this.todosSubject.value;
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
      return new Observable(observer => {
        observer.next(undefined);
        observer.complete();
      });
    }

    return this.updateTodo(id, { completed: !todo.completed });
  }

  // UTILITY - Delete all completed todos
  deleteCompleted(): Observable<number> {
    return new Observable(observer => {
      let todos = this.todosSubject.value;
      const completedCount = todos.filter(t => t.completed).length;
      todos = todos.filter(t => !t.completed);
      
      this.saveTodos(todos);
      this.todosSubject.next([...todos]);
      observer.next(completedCount);
      observer.complete();
    });
  }

  // UTILITY - Get count of active todos
  getActiveTodosCount(): number {
    return this.todosSubject.value.filter(t => !t.completed).length;
  }

  // UTILITY - Get count of completed todos
  getCompletedTodosCount(): number {
    return this.todosSubject.value.filter(t => t.completed).length;
  }
}
