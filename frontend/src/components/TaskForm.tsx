import { ChangeEvent } from "react";

interface TaskFormProps {
  name: string;
  handleInputChange: (event:ChangeEvent<HTMLInputElement>) => void;
}

export default function TaskForm({
  name,
  handleInputChange,
}: TaskFormProps) {
  return (
    <form className="task-form">
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
