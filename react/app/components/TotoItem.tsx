'use client';

import { useTodos } from '../context/TodoContext';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  setEditId: (id: number | null) => void;
  setInputValue: (val: string) => void;
}

export default function TodoItem({ todo, setEditId, setInputValue }: Props) {
  const { dispatch } = useTodos();

  const handleEdit = () => {
    setInputValue(todo.text);
    setEditId(todo.id);
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE', payload: todo.id });
  };

  const toggleComplete = () => {
    dispatch({ type: 'TOGGLE', payload: todo.id });
  };

  return (
    <li className="flex items-center justify-between border rounded-lg px-3 py-2 bg-gray-50">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
        />
        <span className={todo.completed ? 'line-through' : ''}>
          {todo.text}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="px-2 py-1 bg-yellow-400 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
