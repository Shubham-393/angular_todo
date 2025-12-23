// Todo Model/Interface
export interface Todo {
  id: number | string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

// For creating new todos (without id and createdAt)
export interface TodoCreate {
  title: string;
  description: string;
}

// For updating todos
export interface TodoUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}
