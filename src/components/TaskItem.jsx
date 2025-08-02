export default function TaskItem({ task, index, toggleComplete, deleteTask, editTask }) {
  const today = new Date().toISOString().split("T")[0];
  let alert = null;

  if (task.date) {
    if (task.date < today) {
      alert = <span className="task-alert alert-danger">⚠️ Vencida</span>;
    } else {
      const diff = (new Date(task.date) - new Date(today)) / (1000 * 60 * 60 * 24);
      if (diff <= 1 && diff >= 0) {
        alert = <span className="task-alert alert-warning">🔔 Hoy</span>;
      }
    }
  }

  return (
    <li className={`${task.completed ? "completed" : ""} ${task.priority}`}>
      <span onClick={() => toggleComplete(index)}>{task.text}</span>
      <small className="priority-label">({task.priority})</small>
      {alert}
      <div className="actions">
        <button onClick={() => editTask(index)}>✏️</button>
        <button onClick={() => deleteTask(index)}>❌</button>
      </div>
    </li>
  );
}
