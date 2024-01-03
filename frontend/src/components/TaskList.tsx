import TaskForm from "./TaskForm";
import Task from "./Task";
import { useState, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../api.config";
import Loader from "../assets/loader.gif";

interface Task {
  _id: string;
  name: string;
  completed: boolean;
  deleteTask?: (id: string) => void;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function getTasks() {
    setIsLoading(true);
    await axios
      .get(`${URL}/api/v1/tasks`)
      .then((res) => {
        const { alltasks } = res.data.tasks;
        setTasks(alltasks);
        console.log(res.data.tasks.alltasks);
        toast.success(`data fetched successfully`);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          const errorCode = error.response.status;
          toast.error(`Problem occured received status: ${errorCode}`);
        } else {
          toast.error(`Error occured, ${error.message}`);
          console.log(error.message);
          setIsLoading(false);
        }
      });
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function createTask(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim() === "") {
      return toast.error("input field cannot be empty");
    }
    await axios
      .post<Task>(`${URL}/api/v1/tasks`, formData)
      .then((res) => {
        console.log(res.data);
        toast.success(`Task added successfully`);
        setFormData({ ...formData, name: "" });
        getTasks()
      })
      .catch((error) => {
        if (error.response) {
          const errorCode = error.response.status;
          toast.error(`Problem occured received status: ${errorCode}`);
        } else {
          toast.error(`Error occured, ${error.message}`);
          console.log(error.message);
        }
      });
  }

  async function deleteTask(id: string) {
    await axios
      .delete(`${URL}/api/v1/tasks/${id}`)
      .then((res) => {
        console.log(res.data);
        toast.success(`task successfully deleted`);
        getTasks();
      })
      .catch((error) => {
        if (error.response) {
          const errorCode = error.response.status;
          toast.error(`Failed to delete task`, errorCode);
        } else {
          toast.error(`Error occured, ${error.message}`);
        }
      });
  }

  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(cTask);
  }, [tasks]);

  async function getSingleTask(task: Task) {
    setFormData({ name: task.name, completed: false });
    setTaskId(task._id);
    setIsEditing(true);
  }

  async function updateTask(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name === "") return toast.error(`input field cannot be empty`);
    try {
      await axios.patch(`${URL}/api/v1/tasks/${taskId}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
      toast.success(`task successfully updated`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  async function setToComplete(task: Task) {
    const newFormData = {
      name: task.name,
      completed: true,
    };
    try {
      await axios.patch(`${URL}/api/v1/tasks/${task._id}`, newFormData);
      toast.success(`task status successfully updated`);
      getTasks();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        createTask={createTask}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length === 0 && <p>No task found, enter a new task</p>}
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b> {tasks.length}
        </p>
        <p>
          <b>Completed Tasks:</b> {completedTasks.length}
        </p>
      </div>
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={Loader} alt="Loading..." />
        </div>
      )}
      {!isLoading && tasks?.length === 0 ? (
        <p className="--py">No tasks added</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
