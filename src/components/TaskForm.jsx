import {useState} from 'react';
import '../styles/TaskForm.scss';

const TaskForm = ({ createNewTask }) => {
    const [newTaskName, setNewTaskName] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createNewTask(newTaskName);
      setNewTaskName('');
    };
  
    return (
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Entra una nueva tarea"
          onChange={(e) => setNewTaskName(e.target.value)}
          value={newTaskName}
        />
        <button>Guardar tarea</button>
      </form>
    );
  };
  
  export default TaskForm;