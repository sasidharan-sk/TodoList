// useTodoApp.js

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, editTodo,setTodos, toggleComplete } from "../utils/todoSlice";

export const useTodoApp = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todo); // Access todos from Redux store

  const [todoText, setTodoText] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://localhost:7053/api/Todo");
      const data = await response.json();
      dispatch(setTodos(data)); // Dispatch action to set todos in Redux store
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodoItem = async () => {
    try {
      const response = await fetch("https://localhost:7053/api/Todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: todoText,
          completed: false,
        }),
      });
      const newTodo = await response.json();
      dispatch(addTodo(newTodo)); // Dispatch action to add a new todo
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodoItem = async () => {
    try {
      const response = await fetch(`https://localhost:7053/api/Todo/${editTodoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: todoText }),
      });
      const updatedTodo = await response.json();
      dispatch(editTodo({ id: editTodoId, text: updatedTodo.text })); // Dispatch action to edit a todo
      setEditTodoId(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodoItem = async (id) => {
    try {
      await fetch(`https://localhost:7053/api/Todo/${id}`, {
        method: "DELETE",
      });
      dispatch(removeTodo(id)); // Dispatch action to remove a todo
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await fetch(`https://localhost:7053/api/Todo/Toggle/${id}`, {
        method: "PATCH",
      });
      dispatch(toggleComplete(id)); // Dispatch action to toggle completion status
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  const handleTodoChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleAddOrUpdateTodo = () => {
    if (todoText.trim() !== "") {
      if (editTodoId !== null) {
        updateTodoItem();
      } else {
        addTodoItem();
      }
      resetTodoInput();
    }
  };

  const handleEditTodo = (todoId) => {
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    setTodoText(todoToEdit.text);
    setEditTodoId(todoId);
  };

  const handleCancelEdit = () => {
    resetTodoInput();
  };

  const resetTodoInput = () => {
    setTodoText("");
    setEditTodoId(null);
  };

  return {
    todos,
    todoText,
    editTodoId,
    handleTodoChange,
    handleAddOrUpdateTodo,
    handleEditTodo,
    handleCancelEdit,
    deleteTodoItem,
    handleToggle,
  };
};
