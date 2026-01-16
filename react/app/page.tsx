'use client';

import TodoApp from './components/TodoList';
import { TodoProvider } from './context/TodoContext';

export default function Page() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}
