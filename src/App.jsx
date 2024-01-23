import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import TaskFilter from './components/TaskFilter';
import './App.css'

function App() {
  const [taskItems, setTasksItems] = useState([]);
  const [filter, setFilter] = useState('all');

  function createNewTask(taskName) {
    if (!taskItems.find((task) => task.name === taskName)) {
      setTasksItems([...taskItems, { name: taskName, done: false }]);
    }
  }

  const ChangeTaskState = (task) => {
    setTasksItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  const handleDelete = (task) => {
    setTasksItems(taskItems.filter((t) => t.name !== task.name));
  };

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data) {
      setTasksItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredTasks = () => {
    if (filter === 'pending') {
      return taskItems.filter((task) => !task.done);
    } else if (filter === 'completed') {
      return taskItems.filter((task) => task.done);
    } else {
      return taskItems;
    }
  };

  return (
    <div className="App">
      <h1>Organizador de tareas</h1>
      <TaskForm createNewTask={createNewTask} />
      <TaskFilter onFilterChange={handleFilterChange} />
      <div className='table-container'>
        <TaskTable tasks={filteredTasks()} ChangeTaskState={ChangeTaskState} onDelete={handleDelete} />
      </div>
      
    </div>
  );
}

export default App;