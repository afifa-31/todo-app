import { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

type Filter = "all" | "active" | "done";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/todos";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const fetchTodos = async () => {
    const res = await axios.get<Todo[]>(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post(API, { title });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (t: Todo) => {
    await axios.put(`${API}/${t._id}`, { completed: !t.completed });
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  const visible = todos.filter((t) =>
    filter === "all" ? true : filter === "done" ? t.completed : !t.completed
  );
  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="card">
      <h1 className="title">📝 My To-Do List</h1>
      <p className="subtitle">Stay organised, one task at a time</p>

      <div className="add-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="What do you need to do?"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filters">
        {(["all", "active", "done"] as Filter[]).map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f === "active" ? "Active" : "Done"}
          </button>
        ))}
      </div>

      <ul className="list">
        {visible.map((t) => (
          <li key={t._id} className={`item ${t.completed ? "done" : ""}`}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTodo(t)}
            />
            <span>{t.title}</span>
            <button className="delete-btn" onClick={() => deleteTodo(t._id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p className="empty">No tasks here yet 🎉</p>}

      <p className="footer">
        {remaining} task{remaining !== 1 ? "s" : ""} remaining
      </p>
    </div>
  );
}