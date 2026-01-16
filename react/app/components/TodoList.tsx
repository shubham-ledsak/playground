'use client';
import { useState } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TotoItem';
import { useTodos } from '../context/TodoContext';

export default function TodoApp() {
  const { todos } = useTodos();
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Todo List</h2>

        <TodoInput
          editId={editId}
          setEditId={setEditId}
          setInputValue={setInputValue}
          inputValue={inputValue}
        />

        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              setEditId={setEditId}
              setInputValue={setInputValue}
            />
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No todos yet 🚀</p>
        )}
        {todos.filter((t) => !t.completed).length > 0 && (
          <div className="mt-4 text-center text-gray-600">
            {todos.filter((t) => !t.completed).length} task
            {todos.filter((t) => !t.completed).length > 1 ? 's' : ''} left
          </div>
        )}
      </div>
    </div>
  );
}
