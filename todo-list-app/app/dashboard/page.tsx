'use client';

import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { CreateTodoInput, Todo, UpdateTodoInput } from '../../types';

const Icons = {
  Clipboard: (props: { className?: string }) => (
    <svg className={`h-5 w-5 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  Plus: (props: { className?: string }) => (
    <svg className={`h-5 w-5 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Search: (props: { className?: string }) => (
    <svg className={`h-5 w-5 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Logout: (props: { className?: string }) => (
    <svg className={`h-5 w-5 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Pencil: (props: { className?: string }) => (
    <svg className={`h-5 w-5 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  Trash: (props: { className?: string }) => (
    <svg className={`h-5 w-5 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Calendar: (props: { className?: string }) => (
    <svg className={`h-4 w-4 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Check: (props: { className?: string }) => (
    <svg className={`h-4 w-4 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
};

const DashboardPage: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<CreateTodoInput>({ title: '', description: '' });
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/todos');
      const data = await res.json();

      if (res.ok) {
        setTodos(data.todos || []);
      } else if (res.status === 401) {
        router.push('/login');
      } else {
        setError(data.message || 'Failed to fetch todos');
      }
    } catch {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchTodos();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [fetchTodos]);

  const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;
    setIsCreating(true);
    setError('');

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      const data = await res.json();

      if (res.ok) {
        setTodos((current) => [data.todo, ...current]);
        setNewTodo({ title: '', description: '' });
      } else {
        setError(data.message || 'Failed to create todo');
      }
    } catch {
      setError('Failed to create todo');
    } finally {
      setIsCreating(false);
    }
  };

  const updateTodo = async (id: number, updates: UpdateTodoInput) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();

      if (res.ok) {
        setTodos((current) => current.map((todo) => (todo.id === id ? data.todo : todo)));
        setEditingTodoId(null);
      } else {
        setError(data.message || 'Failed to update todo');
      }
    } catch {
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id: number) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok) {
        setTodos((current) => current.filter((todo) => todo.id !== id));
      } else {
        setError(data.message || 'Failed to delete todo');
      }
    } catch {
      setError('Failed to delete todo');
    }
  };

  const toggleComplete = async (id: number) => {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;
    await updateTodo(id, { ...todo, completed: !todo.completed });
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter((todo) => {
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;
      return todo.title.toLowerCase().includes(term) || (todo.description?.toLowerCase().includes(term) ?? false);
    });

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    active: todos.filter((todo) => !todo.completed).length,
    completionRate: todos.length > 0 ? Math.round((todos.filter((todo) => todo.completed).length / todos.length) * 100) : 0,
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f4efe8_0%,_#faf7f2_38%,_#f3f0ea_100%)] px-4">
        <div className="rounded-3xl border border-white/70 bg-white/85 px-5 py-4 text-sm shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur sm:px-6 sm:py-5 sm:text-base">
          Loading your todos...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4efe8_0%,_#faf7f2_38%,_#f3f0ea_100%)] text-stone-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-8">
        <header className="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3 sm:items-center sm:gap-4">
              <div className="rounded-2xl bg-stone-900 p-2.5 text-white shadow-lg sm:p-3">
                <Icons.Clipboard />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">My Todo List</h1>
                <p className="mt-1 text-xs leading-5 text-stone-600 sm:text-sm">
                  {stats.total} total {' '} {stats.active} active {' '} {stats.completed} completed {' '} {stats.completionRate}% complete
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-stone-900 px-5 text-sm font-medium text-white transition hover:bg-stone-800 sm:w-auto"
            >
              <Icons.Logout />
              Logout
            </button>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          <StatCard title="Total Tasks" value={stats.total} />
          <StatCard title="Active Tasks" value={stats.active} />
          <StatCard title="Completed Tasks" value={stats.completed} />
          <StatCard title="Completion Rate" value={`${stats.completionRate}%`} />
        </section>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            {error}
          </div>
        )}

        <section className="rounded-3xl border border-white/70 bg-white/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur sm:p-6">
          <form onSubmit={createTodo} className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
              <input
                type="text"
                placeholder="What's on your mind?"
                required
                className="w-full rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 text-stone-800 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200 sm:px-5 sm:py-3.5"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              />
              <button
                type="submit"
                disabled={isCreating}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-stone-900 px-7 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icons.Plus />
                {isCreating ? 'Adding...' : 'Add Task'}
              </button>
            </div>
            <textarea
              placeholder="Add a description (optional)"
              rows={2}
              className="w-full resize-none rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 text-stone-800 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200 sm:px-5 sm:py-3.5"
              value={newTodo.description || ''}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
          </form>
        </section>

        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
            <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>Active</FilterButton>
            <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>Completed</FilterButton>
          </div>
          <div className="relative w-full sm:w-72">
            <Icons.Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search todos..."
              className="w-full rounded-2xl border-2 border-stone-200 bg-white py-2.5 pl-11 pr-4 text-stone-800 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        <section className="flex-1 space-y-3 pb-6 sm:space-y-4 sm:pb-4">
          {filteredTodos.length === 0 ? (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-xl sm:p-14">
              <div className="mx-auto flex max-w-sm flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-900 sm:h-20 sm:w-20">
                  <Icons.Clipboard className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-stone-800">
                    {searchTerm ? 'No matching todos' : 'All caught up'}
                  </h3>
                  <p className="mt-2 text-stone-500">
                    {searchTerm
                      ? 'Try adjusting your search terms.'
                      : filter !== 'all'
                      ? `You don't have any ${filter} todos.`
                      : 'Create your first task above to get started.'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <article key={todo.id} className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-md transition hover:shadow-xl">
                {editingTodoId === todo.id ? (
                  <TodoEditForm
                    todo={todo}
                    onSave={(updates) => updateTodo(todo.id, updates)}
                    onCancel={() => setEditingTodoId(null)}
                  />
                ) : (
                  <TodoItem
                    todo={todo}
                    onToggle={() => toggleComplete(todo.id)}
                    onEdit={() => setEditingTodoId(todo.id)}
                    onDelete={() => deleteTodo(todo.id)}
                  />
                )}
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-md sm:p-5">
      <p className="text-sm font-medium text-stone-500">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-stone-900 sm:text-3xl">{value}</p>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${
        active ? 'bg-stone-900 text-white' : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-100'
      }`}
    >
      {children}
    </button>
  );
}

function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: {
  todo: Todo;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  }) {
  return (
    <div className="p-4 sm:p-5 sm:py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <button onClick={onToggle} className="mt-1 flex-shrink-0" aria-label="Toggle todo">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                todo.completed ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 text-transparent'
              }`}
            >
              <Icons.Check />
            </div>
          </button>

          <div className="min-w-0 flex-1">
            <h3 className={`break-words text-base font-semibold sm:text-lg ${todo.completed ? 'line-through text-stone-400' : 'text-stone-900'}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`mt-1 break-words text-sm ${todo.completed ? 'line-through text-stone-400' : 'text-stone-600'}`}>
                {todo.description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <span className="inline-flex items-center gap-1">
                <Icons.Calendar />
                {new Date(todo.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              {todo.completed && (
                <span className="rounded-full bg-stone-100 px-2 py-0.5 font-medium text-stone-700">
                  Done
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button onClick={onEdit} className="rounded-lg p-2 text-stone-700 transition hover:bg-stone-100" title="Edit task">
            <Icons.Pencil />
          </button>
          <button onClick={onDelete} className="rounded-lg p-2 text-red-600 transition hover:bg-red-50" title="Delete task">
            <Icons.Trash />
          </button>
        </div>
      </div>
    </div>
  );
}

function TodoEditForm({
  todo,
  onSave,
  onCancel,
}: {
  todo: Todo;
  onSave: (updates: UpdateTodoInput) => void;
  onCancel: () => void;
  }) {
  const [editedTodo, setEditedTodo] = useState<UpdateTodoInput>({
    title: todo.title,
    description: todo.description,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedTodo);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-stone-50 p-4 sm:p-6">
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700">Task Title *</label>
          <input
            type="text"
            className="w-full rounded-2xl border-2 border-stone-200 bg-white px-4 py-2.5 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200"
            value={editedTodo.title || ''}
            onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700">Description</label>
          <textarea
            className="w-full resize-none rounded-2xl border-2 border-stone-200 bg-white px-4 py-2.5 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200"
            value={editedTodo.description || ''}
            onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
            rows={3}
            placeholder="Add more details..."
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="flex-1 rounded-full bg-stone-900 px-6 py-2.5 font-medium text-white transition hover:bg-stone-800"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full bg-stone-200 px-6 py-2.5 font-medium text-stone-700 transition hover:bg-stone-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default DashboardPage;
