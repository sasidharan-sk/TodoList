// Todo.js

import React from "react";
import "../styling/Todo.css"; // Import a separate CSS file for styling

const Todo = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`} key={todo.id}>
      <span className="todo-text">{todo.text}</span>
      <button
        onClick={() => onToggleComplete(todo.id)}
        className={`toggle-button ${todo.completed ? "undo" : "complete"}`}
      >
        {todo.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => onEdit(todo.id)} className="edit-button">
        Edit
      </button>
      <button onClick={() => onDelete(todo.id)} className="delete-button">
        Delete
      </button>
    </li>
  );
};

export default Todo;
