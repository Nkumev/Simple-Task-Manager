import { FaEdit } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

interface Tasks {
  _id: string;
  name: string;
  completed: boolean;
}

interface TaskProps {
  task: {
    _id: string;
    name: string;
    completed: boolean;
  };
  index: number;
  deleteTask: (id: string) => void;
  getSingleTask: (task: Tasks) => void;
}

function Task({ task, index, deleteTask, getSingleTask }: TaskProps) {
  return (
    <div className="task">
      <p>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" />
        <FaEdit color="purple" onClick={() => getSingleTask(task)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
}

export default Task;
