// hooks/useTodos.ts
import { useState, useEffect } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput, TodoFilters, TodoStats } from '../types';

interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  stats: TodoStats;
  createTodo: (data: CreateTodoInput) => Promise<Todo>;
  updateTodo: (id: number, data: UpdateTodoInput) => Promise<Todo>;
  deleteTodo: (id: number) => Promise<void>;
  toggleComplete: (id: number) => Promise<void>;
  fetchTodos: (filters?: TodoFilters) => Promise<void>;
}

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async (filters?: TodoFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      let url = '/api/todos';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.search) params.append('search', filters.search);
        if (params.toString()) url += `?${params.toString()}`;
      }
      
      const res = await fetch(url);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch todos');
      }
      
      const data = await res.json();
      setTodos(data.todos || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (data: CreateTodoInput): Promise<Todo> => {
    try {
      setError(null);
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create todo');
      }

      const result = await res.json();
      const newTodo = result.todo;
      setTodos([newTodo, ...todos]);
      return newTodo;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create todo');
      throw error;
    }
  };

  const updateTodo = async (id: number, data: UpdateTodoInput): Promise<Todo> => {
    try {
      setError(null);
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update todo');
      }

      const result = await res.json();
      const updatedTodo = result.todo;
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      return updatedTodo;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update todo');
      throw error;
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      setError(null);
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete todo');
      }

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete todo');
      throw error;
    }
  };

  const toggleComplete = async (id: number): Promise<void> => {
    const todo = todos.find(t => t.id === id);
    if (!todo) throw new Error('Todo not found');
    
    await updateTodo(id, { ...todo, completed: !todo.completed });
  };

  const stats: TodoStats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  };

  useEffect(() => {
    void (async () => {
      await fetchTodos();
    })();
  }, []);

  return {
    todos,
    loading,
    error,
    stats,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    fetchTodos,
  };
}
