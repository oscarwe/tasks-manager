import '../styles/TaskFilter.scss'
const TaskFilter = ({ onFilterChange }) => {
    const handleFilterChange = (e) => {
      onFilterChange(e.target.value);
    };
  
    return (
      <div className="task-filter-container">
        <label>
          Filtrar por:
        </label>
        <select onChange={handleFilterChange}>
            <option value="all">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completas</option>
          </select>
      </div>
    );
  };
  
  export default TaskFilter;