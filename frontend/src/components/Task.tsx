import { FaEdit } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

interface Tasks {
  _id: string;
  name: string;
  completed: boolean;
}

interface TaskProps {
  task: Tasks
  index: number;
  deleteTask: (id: string) => void;
  getSingleTask: (task: Tasks) => void;
  setToComplete: (task: Tasks) => void;
}

function Task({
  task,
  index,
  deleteTask,
  getSingleTask,
  setToComplete,
}: TaskProps) {
  return (
    <div className={task.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() => setToComplete(task)} />
        <FaEdit color="purple" onClick={() => getSingleTask(task)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
}

export default Task;
