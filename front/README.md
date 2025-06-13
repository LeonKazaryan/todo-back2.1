# Todo List CRUD App

A simple Todo List application built with React (TypeScript) and Express.js that demonstrates CRUD operations.

## Features

- Create new todos
- Read/View all todos
- Update existing todos
- Delete todos
- Real-time updates
- Clean and responsive UI

## Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: Node.js with Express
- **Styling**: CSS
- **HTTP Client**: Axios

## CRUD Implementation

### Create (POST)

```typescript
// Frontend (App.tsx)
const addTodo = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  const response = await axios.post<Todo>("http://localhost:5001/api/todos", {
    text: newTodo,
  });
};

// Backend (server.js)
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    text: req.body.text,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
```

### Read (GET)

```typescript
// Frontend (App.tsx)
const fetchTodos = async (): Promise<void> => {
  const response = await axios.get<Todo[]>("http://localhost:5001/api/todos");
  setTodos(response.data);
};

// Backend (server.js)
app.get("/api/todos", (req, res) => {
  res.json(todos);
});
```

### Update (PUT)

```typescript
// Frontend (App.tsx)
const updateTodo = async (id: number, updatedText: string): Promise<void> => {
  const response = await axios.put<Todo>(
    `http://localhost:5001/api/todos/${id}`,
    {
      text: updatedText,
    }
  );
};

// Backend (server.js)
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex] = { ...todos[todoIndex], ...req.body };
  res.json(todos[todoIndex]);
});
```

### Delete (DELETE)

```typescript
// Frontend (App.tsx)
const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:5001/api/todos/${id}`);
};

// Backend (server.js)
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});
```

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   # Backend
   cd back
   npm install
   npm start

   # Frontend
   cd front
   npm install
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app

## Project Structure

```
├── front/                 # React frontend
│   ├── src/
│   │   ├── App.tsx       # Main component with CRUD logic
│   │   ├── types.ts      # TypeScript interfaces
│   │   └── App.css       # Styles
│   └── package.json
│
└── back/                  # Express backend
    ├── server.js         # API endpoints
    └── package.json
```
