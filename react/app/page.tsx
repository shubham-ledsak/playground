'use client';
import { todo } from 'node:test';
import { useEffect, useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [highlightId, setHighlightId] = useState<number | null>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddOrUpdate = () => {
    if (!input.trim()) return;
    if (editId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
      console.log('edited');
    } else {
      console.log('added');
      setTodos([...todos, { id: Date.now(), text: input }]);
    }
    setInput('');
  };
  const handleEdit = (todo: Todo) => {
    setInput(todo.text);
    setEditId(todo.id);
    setHighlightId(todo.id); // Highlight start

    // 1 second ke baad highlight remove kar do
    setTimeout(() => setHighlightId(null), 1000);
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Todo List</h2>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter todo"
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddOrUpdate}
            className={`px-4 py-2 rounded-lg text-white ${
              editId
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } `}
          >
            {editId ? 'Update' : 'Add'}
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map((todo, index) => {
            return (
              <li
                key={todo.id}
                className={`flex items-center justify-between border rounded-lg px-3 py-2 transition-colors duration-500
    ${highlightId === todo.id ? 'bg-yellow-100 animate-pulse' : 'bg-gray-50'}
  `}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed || false}
                    onChange={() => toggleComplete(todo.id)}
                    className="w-4 h-4"
                  />
                  <span
                    className={`text-gray-800 ${
                      todo.completed ? 'line-through' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-sm px-2 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-sm px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No todos yet 🚀</p>
        )}
        {todos.filter((todo) => !todo.completed).length > 0 && (
          <div className="mt-4 text-center text-gray-600">
            {todos.filter((todo) => !todo.completed).length} task
            {todos.filter((todo) => !todo.completed).length > 1 ? 's' : ''} left
          </div>
        )}
      </div>
    </div>
  );
}
