import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("media");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ 
      text: text.trim(), 
      priority, 
      date, 
      completed: false, 
      createdAt: Date.now() 
    });

    setText("");
    setPriority("media");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button type="submit">Agregar</button>
    </form>
  );
}
