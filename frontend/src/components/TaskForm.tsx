import { ChangeEvent } from "react";

interface TaskFormProps {
  name: string;
  createTask: (event: ChangeEvent<HTMLFormElement>)=>void
  handleInputChange: (event:ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  updateTask: (event: ChangeEvent<HTMLFormElement>)=>void
}

export default function TaskForm({createTask,
  name,
  handleInputChange,
  isEditing,
  updateTask
}: TaskFormProps) {
  return (
    <form className="task-form" onSubmit={isEditing ? updateTask: createTask}>
      <input
        type="text"
        placeholder="Add a task here"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <button type="submit">{isEditing ? "Edit": "Add"}</button>
    </form>
  );
}
