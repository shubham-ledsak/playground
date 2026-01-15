'use client';
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    if (!input.trim()) return;

    if (editId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: input }]);
    }

    setInput('');
  };

  const handleEdit = (todo: Todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
            placeholder="Enter todo"
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAddOrUpdate}
            className={`px-4 py-2 rounded-lg text-white ${
              editId
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {editId ? 'Update' : 'Add'}
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2"
            >
              <span className="text-gray-800">{todo.text}</span>

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
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No todos yet 🚀</p>
        )}
      </div>
    </div>
  );
}
