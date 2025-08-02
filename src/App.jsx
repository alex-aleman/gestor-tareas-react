import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import Search from "./components/Search";
import TaskCounter from "./components/TaskCounter";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [order, setOrder] = useState("fecha");
  const [search, setSearch] = useState("");

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filtrar y ordenar tareas
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());
      if (!matchesSearch) return false;
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .sort((a, b) => {
      if (order === "prioridad") {
        const orden = { alta: 1, media: 2, baja: 3 };
        return orden[a.priority] - orden[b.priority];
      } else if (order === "vencimiento") {
        return new Date(a.date || 0) - new Date(b.date || 0);
      }
      return a.createdAt - b.createdAt;
    });

  // 📌 Funciones
  const addTask = (task) => setTasks([...tasks, { ...task, notified: false }]);

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    updated[index].notified = false;
    setTasks(updated);
  };

  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  const editTask = (index) => {
    const newText = prompt("Editar tarea:", tasks[index].text);
    if (newText && newText.trim()) {
      const updated = [...tasks];
      updated[index].text = newText.trim();
      updated[index].notified = false;
      setTasks(updated);
    }
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  useEffect(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.type === "PLAY_SOUND") {
        const audio = new Audio("/alert.mp3"); // 📁 Coloca el mp3 en /public
        audio.play().catch(() => console.log("Sonido bloqueado por navegador"));
      }
    });
  }
}, []);


// Guardamos IDs de tareas notificadas
const [notifiedTasks, setNotifiedTasks] = useState(() => {
  const saved = localStorage.getItem("notifiedTasks");
  return saved ? JSON.parse(saved) : [];
});

const checkDueTasks = () => {
  if (!navigator.serviceWorker.controller) return;

  const today = new Date().toISOString().split("T")[0];

  tasks.forEach((task) => {
    if (!task.date || task.completed) return;

    const diff =
      (new Date(task.date) - new Date(today)) / (1000 * 60 * 60 * 24);

    let status = null;
    if (diff <= 1 && diff >= 0) status = "proxima";
    else if (diff < 0) status = "vencida";

    // ✅ Evita repetir notificaciones
    if (status && !notifiedTasks.includes(task.text)) {
      navigator.serviceWorker.controller.postMessage({
        type: "SHOW_NOTIFICATION",
        task,
        status,
      });

      // ✅ Guardar que ya fue notificada
      const updated = [...notifiedTasks, task.text];
      setNotifiedTasks(updated);
      localStorage.setItem("notifiedTasks", JSON.stringify(updated));
    }
  });
};




  // ✅ Se ejecuta solo al cargar la app
  useEffect(() => {
    if (!("Notification" in window)) return;

    const requestAndCheck = async () => {
      if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {checkDueTasks()};
      } else {
        checkDueTasks();
      }
    };

    requestAndCheck();
 
  }, []);

  

  return (
    <div className="container">
      <div className="header">
        <h1>Gestor de Tareas</h1>
        <button
          id="toggle-theme"
          onClick={() => document.body.classList.toggle("dark")}
        >
          🌓
        </button>
      </div>

      <TaskForm onAdd={addTask} />

      <Filters filter={filter} setFilter={setFilter} order={order} setOrder={setOrder} />

      <Search search={search} setSearch={setSearch} />

      <TaskList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        editTask={editTask}
      />

      <TaskCounter pending={pendingCount} completed={completedCount} />
    </div>
  );
}
