// lib/validation.ts
import { RegisterData, LoginCredentials, CreateTodoInput } from '../types';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
}

export function validateUsername(username: string): boolean {
  // 3-30 characters, alphanumeric and underscore only
  const re = /^[a-zA-Z0-9_]{3,30}$/;
  return re.test(username);
}

export function validateRegisterData(data: RegisterData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.username || !validateUsername(data.username)) {
    errors.push({
      field: 'username',
      message: 'Username must be 3-30 characters (letters, numbers, underscore)',
    });
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Invalid email address',
    });
  }

  if (!data.password || !validatePassword(data.password)) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    });
  }

  return errors;
}

export function validateLoginData(data: LoginCredentials): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.username || data.username.trim().length === 0) {
    errors.push({
      field: 'username',
      message: 'Username is required',
    });
  }

  if (!data.password || data.password.length === 0) {
    errors.push({
      field: 'password',
      message: 'Password is required',
    });
  }

  return errors;
}

export function validateTodoInput(data: CreateTodoInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push({
      field: 'title',
      message: 'Title is required',
    });
  }

  if (data.title && data.title.length > 200) {
    errors.push({
      field: 'title',
      message: 'Title must be less than 200 characters',
    });
  }

  return errors;
}