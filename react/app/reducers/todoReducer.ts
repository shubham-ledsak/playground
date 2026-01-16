interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type TodoAction =
  | { type: 'ADD'; payload: Todo }
  | { type: 'UPDATE'; payload: { id: number; text: string } }
  | { type: 'DELETE'; payload: number }
  | { type: 'TOGGLE'; payload: number };

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'UPDATE':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.payload);
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
}
