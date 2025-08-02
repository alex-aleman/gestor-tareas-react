export default function Filters({ filter, setFilter, order, setOrder }) {
  return (
    <div className="filters">
      <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Todas</button>
      <button className={`filter-btn ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Completadas</button>
      <button className={`filter-btn ${filter === "pending" ? "active" : ""}`} onClick={() => setFilter("pending")}>Pendientes</button>

      <label>Ordenar por:</label>
      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="fecha">Fecha de creación</option>
        <option value="prioridad">Prioridad</option>
        <option value="vencimiento">Fecha de vencimiento</option>
      </select>
    </div>
  );
}
