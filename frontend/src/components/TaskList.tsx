import TaskForm from "./TaskForm";
import Task from "./Task";
import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function TaskList() {
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function createTask(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim() === "") {
      return toast.error("input field cannot be empty");
    }
    await axios
      .post("http://localhost:3000/api/v1/tasks", formData)
      .then((res) => {
        res.data;
        setFormData({ ...formData, name: "" });
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

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        createTask={createTask}
        handleInputChange={handleInputChange}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b>0
        </p>
        <p>
          <b>Completed Tasks:</b>0
        </p>
      </div>
      <hr />
      <Task />
    </div>
  );
}
