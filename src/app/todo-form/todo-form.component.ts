import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo, TodoCreate } from '../models/todo.model';

@Component({
  selector: 'app-todo-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent implements OnInit, OnChanges {
  // Receive todo to edit from parent component
  @Input() editingTodoData: Todo | null = null;

  // Emit event after successful operation
  @Output() operationComplete = new EventEmitter<void>();

  // Form data
  formData = {
    title: '',
    description: ''
  };

  // UI state
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // If editing, populate form with existing data
    if (this.editingTodoData) {
      this.formData = {
        title: this.editingTodoData.title,
        description: this.editingTodoData.description
      };
    }
  }

  // Watch for changes to editingTodoData input
  ngOnChanges(): void {
    if (this.editingTodoData) {
      this.formData = {
        title: this.editingTodoData.title,
        description: this.editingTodoData.description
      };
      this.errorMessage = '';
      this.successMessage = '';
    } else {
      this.resetForm();
    }
  }

  // Handle form submission (both create and update)
  onSubmit(): void {
    if (!this.formData.title.trim()) {
      this.errorMessage = 'Please enter a title';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.editingTodoData) {
      // UPDATE operation
      this.todoService
        .updateTodo(this.editingTodoData.id, {
          title: this.formData.title,
          description: this.formData.description
        })
        .subscribe(
          (result) => {
            this.isSubmitting = false;
            if (result) {
              this.successMessage = 'Todo updated successfully!';
              setTimeout(() => {
                this.cancelEdit();
                this.operationComplete.emit();
              }, 500);
            } else {
              this.errorMessage = 'Failed to update todo';
            }
          },
          (error) => {
            this.isSubmitting = false;
            this.errorMessage = 'Error updating todo: ' + error.message;
          }
        );
    } else {
      // CREATE operation
      const newTodo: TodoCreate = {
        title: this.formData.title,
        description: this.formData.description
      };

      this.todoService.createTodo(newTodo).subscribe(
        (result) => {
          this.isSubmitting = false;
          this.successMessage = 'Todo created successfully!';
          setTimeout(() => {
            this.resetForm();
            this.operationComplete.emit();
          }, 500);
        },
        (error) => {
          this.isSubmitting = false;
          this.errorMessage = 'Error creating todo: ' + error.message;
        }
      );
    }
  }

  // Cancel edit and reset form
  cancelEdit(): void {
    this.resetForm();
    this.editingTodoData = null;
  }

  // Reset form to initial state
  private resetForm(): void {
    this.formData = {
      title: '',
      description: ''
    };
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Check if field is invalid (for validation messages)
  isFieldInvalid(fieldName: string): boolean {
    return fieldName === 'title' && this.formData.title.trim() === '';
  }
}
