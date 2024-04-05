import React from 'react';
import { Task } from './types';
import AddTask from './AddTask';
import TaskList from './TaskList';
import TaskListItem from './TaskListItem';
import TaskListHeader from './TaskListHeader';

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const onAddTask = (taskName: string) => {
    const trimmedTaskName = taskName.trim();

    if (!trimmedTaskName) {
      return;
    }

    setTasks([
      ...tasks,
      {
        id: new Date().getTime(), // Not a great way to generate IDs
        title: trimmedTaskName,
        isCompleted: false,
      },
    ]);
  };

  const onEditTask = (id: number, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
  };

  const onDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <TaskListHeader count={tasks.length} />
      <AddTask onAddTask={onAddTask} />
      <TaskList>
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </TaskList>
    </div>
  );
}

export default App;
