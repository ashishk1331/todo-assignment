import { Task } from './types';
import { useState } from 'react';

type TaskListProps = {
  task: Task;
  onEditTask: (id: number, newTitle: string) => void;
  onDeleteTask: (id: number) => void;
};

export default function TaskListItem({
  task,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  const [editing, setEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  function handleSave() {
    onEditTask(task.id, taskTitle);
    setEditing(false);
  }

  function handleDelete() {
    onDeleteTask(task.id);
  }

  function handleCancel() {
    setTaskTitle(task.title);
    setEditing(false);
  }

  return (
    <li>
      {editing ? (
        <>
          <input
            type="text"
            value={taskTitle}
            onChange={() => setTaskTitle(e.target.value)}
          />
          <button onClick={handleSave}>save</button>
          <button onClick={handleCancel}>cancel</button>
        </>
      ) : (
        <span>{task.title}</span>
      )}
      {!editing && <button onClick={() => setEditing(true)}>edit</button>}
      <button onClick={handleDelete}>delete</button>
    </li>
  );
}
