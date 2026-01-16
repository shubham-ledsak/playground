'use client';
import { useState, useRef, useEffect } from 'react';
import { useTodos } from '../context/TodoContext';

interface Props {
  editId: number | null;
  setEditId: (id: number | null) => void;
  setInputValue: (val: string) => void;
  inputValue: string;
}

export default function TodoInput({
  editId,
  setEditId,
  setInputValue,
  inputValue,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch, todos } = useTodos();

  useEffect(() => {
    inputRef.current?.focus();
  }, [editId]);

  const handleAddOrUpdate = () => {
    const input = inputValue.trim();
    if (!input) return;

    if (editId !== null) {
      dispatch({ type: 'UPDATE', payload: { id: editId, text: input } });
      setEditId(null);
    } else {
      dispatch({
        type: 'ADD',
        payload: { id: Date.now(), text: input, completed: false },
      });
    }
    setInputValue('');
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter todo"
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
  );
}
