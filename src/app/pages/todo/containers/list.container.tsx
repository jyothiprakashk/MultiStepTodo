"use client";

import { useTaskStore } from "@store";
import ListLayout from "../layouts/list.layout";

const TaskListContainer = () => {
  const { tasks, addTask, updateTaskStatus, updateSubTaskStatus } = useTaskStore();

  return (
    <ListLayout
      tasks={tasks}
      addTask={addTask}
      updateTaskStatus={updateTaskStatus}
      updateSubTaskStatus={updateSubTaskStatus}
    />
  );
};

export default TaskListContainer;
