import TaskRow from "./TaskRow";

const TaskTable = ({ tasks, ChangeTaskState, onDelete }) => {
    const taskTableRows = tasks.map((task) => (
      <TaskRow key={task.name} task={task} ChangeTaskState={ChangeTaskState} onDelete={onDelete} state={task.done} />
    ));
  
    return (
      <table>
        <thead>
          <tr>
            <th>Tareas</th>
          </tr>
        </thead>
        <tbody>{taskTableRows}</tbody>
      </table>
    );
  };
  
  export default TaskTable;