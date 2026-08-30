// types/index.ts

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  created_at?: Date;
}

export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string | null;
  completed?: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user?: Omit<User, 'password'>;
  userId?: number;
}

export interface JwtPayload {
  userId: number;
  username: string;
  iat: number;
  exp: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'updated_at' | 'title';
  sortOrder?: 'ASC' | 'DESC';
}

export interface TodoFilters {
  status?: 'all' | 'active' | 'completed';
  search?: string;
}