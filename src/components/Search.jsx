export default function Search({ search, setSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="🔍 Buscar tarea..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
