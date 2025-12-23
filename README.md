# Angular Todo App

A simple, modern Angular todo app demonstrating CRUD operations and key Angular concepts. Use this project to revise and practice Angular basics, and as a starter for backend integration (Django, FastAPI, Node.js, etc).

## Features
- Add, edit, delete, and mark todos as completed
- Clear all completed todos
- Stats: total, active, completed
- Responsive, clean UI
- All logic in services for easy backend switch
- RxJS Observables for reactive state
- Modular structure (components, services, models)

## Key Angular Concepts Covered
- Components (todo-list, todo-form, app)
- Services (todo.service.ts for business logic)
- Dependency Injection
- RxJS Observables & Subjects
- @Input, @Output, EventEmitter for parent-child communication
- Forms (ngModel, ngForm)
- Structural directives (*ngIf, *ngFor)
- Angular CLI usage
- CSS encapsulation and global styles

## How It Works
- Todos are stored in browser localStorage (easy to swap for HTTP backend)
- `TodoService` manages all CRUD operations and state
- `TodoListComponent` displays todos and stats
- `TodoFormComponent` handles add/edit forms
- `AppComponent` ties everything together

## How to Run
```bash
npm install
ng serve
```
Visit [http://localhost:4200](http://localhost:4200)

## How to Add a Backend
- Replace localStorage logic in `TodoService` with HTTP calls (Angular HttpClient)
- Connect to Django, FastAPI, Node.js, etc.

## Learning Resources
- [Angular Docs](https://angular.io/docs)
- [RxJS Docs](https://rxjs.dev/guide/overview)
- [Angular CLI](https://angular.io/cli)

---

This app is designed for learning and revision. Explore the code, experiment, and extend as needed!

---

![Alt text](https://github.com/Shubham-393/angular_todo/blob/main/Screenshot%20(353).png)

---

## File-by-File Explanation

### 1. `src/app/app.component.ts`
- Main root component.
- Imports child components (`todo-list`, `todo-form`).
- Handles editing state and ties together the form and list.
- Functions: `onEditingTodo(todo)`, `onOperationComplete()`.

### 2. `src/app/app.component.html`
- Layout for the app: header, todo form, todo list, footer.
- Passes data/events between form and list components.

### 3. `src/app/app.component.css`
- Styles for the main app container, header, layout, and footer.
- Responsive design for all screen sizes.

### 4. `src/app/models/todo.model.ts`
- Defines TypeScript interfaces for todos:
  - `Todo`: main todo object (id, title, description, completed, createdAt)
  - `TodoCreate`: for creating new todos
  - `TodoUpdate`: for updating existing todos

### 5. `src/app/services/todo.service.ts`
- Central service for all todo logic (CRUD operations).
- Uses RxJS `BehaviorSubject` for reactive state.
- Functions:
  - `getTodos()`, `getTodoById(id)`, `createTodo(data)`, `updateTodo(id, data)`, `deleteTodo(id)`, `toggleTodo(id)`, `deleteCompleted()`, `getActiveTodosCount()`, `getCompletedTodosCount()`
- Stores todos in localStorage (easy to swap for backend API).

### 6. `src/app/todo-list/todo-list.component.ts`
- Displays the list of todos and stats.
- Handles toggling, deleting, editing, and clearing completed todos.
- Emits `editingTodo` event to parent for editing.

### 7. `src/app/todo-list/todo-list.component.html`
- UI for showing todos, stats, and action buttons.
- Uses Angular directives (`*ngFor`, `*ngIf`).

### 8. `src/app/todo-list/todo-list.component.css`
- Styles for the todo list, items, stats, buttons, and responsive layout.

### 9. `src/app/todo-form/todo-form.component.ts`
- Handles add/edit todo form logic.
- Uses Angular forms (`ngModel`, `ngForm`).
- Emits `operationComplete` event after add/edit.
- Functions: `onSubmit()`, `cancelEdit()`, `isFieldInvalid(field)`

### 10. `src/app/todo-form/todo-form.component.html`
- Form UI for adding/editing todos.
- Shows validation, success, and error messages.

### 11. `src/app/todo-form/todo-form.component.css`
- Styles for the todo form, inputs, buttons, messages, and responsive design.

### 12. `src/styles.css`
- Global styles for the app (reset, fonts, selection, code blocks).

### 13. `src/index.html`
- Main HTML entry point for Angular app.
- Loads the root component.

### 14. `angular.json`, `tsconfig.json`, `package.json`
- Angular CLI, TypeScript, and npm configuration files.
- Manage dependencies, build options, and project settings.

---

Each file is modular and focused on a single responsibility, making it easy to learn, revise, and extend the app.
