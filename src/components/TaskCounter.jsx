export default function TaskCounter({ pending, completed }) {
  return (
    <div id="task-counter">
      Pendientes: <span>{pending}</span> | Completadas: <span>{completed}</span>
    </div>
  );
}
