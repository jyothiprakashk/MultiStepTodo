import { FC, useState } from "react";

import { Task, TaskStatus } from "@models";

import TaskList from "../components/list.component";
import styles from "../styles/todo.page.module.scss";
import { Text } from "@components";
import AddTask from "../components/add-task.component";

interface ListLayoutProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  updateSubTaskStatus: (taskId: string, subTaskId: string, status: TaskStatus) => void;
}

const ListLayout: FC<ListLayoutProps> = ({ tasks, addTask, updateTaskStatus, updateSubTaskStatus }) => {
  const completeTask = (taskId: string, status: TaskStatus) => {
    updateTaskStatus(taskId, status);
  };

  const completeSubTask = (taskId: string, subTaskId: string, status: TaskStatus) => {
    updateSubTaskStatus(taskId, subTaskId, status);
  };

  return (
    <div className={styles.todo}>
      <Text content='Todo App' type='title' />
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} completeTask={completeTask} completeSubTask={completeSubTask} />
    </div>
  );
};

export default ListLayout;
