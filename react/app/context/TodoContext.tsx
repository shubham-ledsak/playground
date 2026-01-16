import React, { useContext } from 'react';
import { todoReducer, TodoAction } from '../reducers/todoReducer';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>;
}

export const TodoContext = React.createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [todos, dispatch] = React.useReducer(todoReducer, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used within TodoProvider');
  return context;
}
