import { ReactComponent as DeleteIconSVG } from '../assets/svg/DeleteIcon.svg'
import '../styles/TaskRow.scss'

const TaskRow = ({ task, ChangeTaskState, onDelete, state }) => {

    console.log(state);
    return (
      <tr className="task-row">
        <td className={`${state}-color`}>
            <div className='task-name'>
                {task.name}
            </div>
            <div className='action-buttons'>
                <input type='checkbox' checked={task.done} onChange={() => ChangeTaskState(task)} />
                <button onClick={() => onDelete(task)}>
                    <DeleteIconSVG />
                </button>
            </div>
            
        </td>
      </tr>
    );
  };
  
  export default TaskRow;