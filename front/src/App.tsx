import React, { useState, useEffect } from "react";
import axios from "axios";
import type { Todo } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<number | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (): Promise<void> => {
    try {
      const response = await axios.get<Todo[]>(
        "http://localhost:5001/api/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post<Todo>(
        "http://localhost:5001/api/todos",
        {
          text: newTodo,
        }
      );
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id: number, updatedText: string): Promise<void> => {
    try {
      const response = await axios.put<Todo>(
        `http://localhost:5001/api/todos/${id}`,
        {
          text: updatedText,
        }
      );
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5001/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.target.value)
          }
          placeholder="Add new todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodo === todo.id ? (
              <input
                type="text"
                defaultValue={todo.text}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                  updateTodo(todo.id, e.target.value)
                }
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    updateTodo(todo.id, e.currentTarget.value);
                  }
                }}
                autoFocus
              />
            ) : (
              <>
                <span onClick={() => setEditingTodo(todo.id)}>{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
