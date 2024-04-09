// Body.js

import React from "react";
import Todo from "./Todo";
import "../styling/Body.css";
import { useTodoApp } from "../hooks/useTodoApp";

const Body = () => {
  const {
    todos,
    todoText,
    editTodoId,
    handleTodoChange,
    handleAddOrUpdateTodo,
    handleEditTodo,
    handleCancelEdit,
    deleteTodoItem,
    handleToggle, // Updated to use handleToggle consistently
  } = useTodoApp();

  return (
    <div className="body-container">
      <h1>Todo App</h1>
      <form onSubmit={(e) => e.preventDefault()} className="form-container">
        <input
          type="text"
          placeholder="Enter your todo here..."
          value={todoText}
          onChange={handleTodoChange}
          className="input-field"
        />
        <div className="button-container">
          <button type="button" onClick={handleAddOrUpdateTodo} className="action-button">
            {editTodoId !== null ? "Update" : "Add"}
          </button>
          {editTodoId !== null && (
            <button type="button" onClick={handleCancelEdit} className="cancel-button">
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggleComplete={() => handleToggle(todo.id)} // Updated to use handleToggle
            onEdit={() => handleEditTodo(todo.id)}
            onDelete={() => deleteTodoItem(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Body;
