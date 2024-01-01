import TaskForm from "./TaskForm";
import Task from "./Task";
import {useState, ChangeEvent} from 'react'

interface TaskProps{
  name: string;
  completed: boolean
}


export default function TaskList() {
    const [formData, setFormData] = useState<TaskProps>({
        name: "",
        completed: false
    })

    const {name} = formData

    function handleInputChange(event:ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm name ={name} handleInputChange={handleInputChange}/>
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
