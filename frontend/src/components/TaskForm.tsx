import { ChangeEvent } from "react";

interface TaskFormProps {
  name: string;
  createTask: (event: ChangeEvent<HTMLFormElement>)=>void
  handleInputChange: (event:ChangeEvent<HTMLInputElement>) => void;
}

export default function TaskForm({createTask,
  name,
  handleInputChange,
}: TaskFormProps) {
  return (
    <form className="task-form" onSubmit={createTask}>
      <input
        type="text"
        placeholder="Add a task here"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}
