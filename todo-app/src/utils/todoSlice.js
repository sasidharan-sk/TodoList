import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const { id, text, completed } = action.payload;
      return [...state, { id, text, completed }];
    },
    
    removeTodo: (state, action) => {
      const todoIdToRemove = action.payload;
      return state.filter((todo) => todo.id !== todoIdToRemove);
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      return state.map((todo) => (todo.id === id ? { ...todo, text } : todo));
    },
    toggleComplete: (state, action) => {
      const todoIdToToggle = action.payload;
      return state.map((todo) =>
        todo.id === todoIdToToggle
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
    setTodos: (state, action) => {
      return action.payload; // Directly return the new array of todos
    },
  },
});

export const { addTodo, removeTodo, editTodo, toggleComplete, setTodos } =
  todoSlice.actions;
export default todoSlice.reducer;
