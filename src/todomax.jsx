import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";

// Custom hook untuk sinkronisasi localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default function TodoApp() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Fokus ke input setiap kali selesai submit
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  // Tambah todo
  const handleAdd = () => {
    if (input.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput("");
  };

  // Toggle todo selesai
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Hapus todo
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Hitung jumlah todo selesai
  const completedCount = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", textAlign: "center" }}>
      <h2>📌 To-Do List</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tambah todo..."
        />
        <button onClick={handleAdd} style={{ marginLeft: "5px" }}>
          Tambah
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: "8px 0" }}>
            <span
              onClick={() => handleToggle(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>

      <p>
        ✅ Selesai: {completedCount} / {todos.length}
      </p>
    </div>
  );
}
