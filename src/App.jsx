import React, { useState, useEffect, useCallback  } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import TaskFilter from './components/TaskFilter';
import './App.css'

function App() {
  const [taskItems, setTasksItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [pendingTasksCount, setPendingTasksCount] = useState(0);

  const updatePendingTasksCount = useCallback(() => {
    const pendingCount = taskItems.filter((task) => !task.done).length;
    setPendingTasksCount(pendingCount);
  }, [taskItems]);

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data) {
      setTasksItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
    updatePendingTasksCount();
  }, [taskItems, updatePendingTasksCount]);

  const createNewTask = (taskName) => {
    if (!taskItems.find((task) => task.name === taskName)) {
      setTasksItems([...taskItems, { name: taskName, done: false }]);
      updatePendingTasksCount();
    }
  };

  const ChangeTaskState = (task) => {
    setTasksItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

    if (!task.done) {
      updatePendingTasksCount();
    } else {
      setPendingTasksCount((prevCount) => prevCount - 1);
    }
  };

  const handleDelete = (task) => {
    setTasksItems(taskItems.filter((t) => t.name !== task.name));
    if (!task.done) {
      updatePendingTasksCount();
    }
  };

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
      <h1 className='app-title'>Organizador de tareas</h1>
      <p className='task-counter'>Tareas pendientes: {pendingTasksCount}</p>
      <TaskForm createNewTask={createNewTask} />
      <TaskFilter onFilterChange={handleFilterChange} />
      <div className='table-container'>
        <TaskTable tasks={filteredTasks()} ChangeTaskState={ChangeTaskState} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;