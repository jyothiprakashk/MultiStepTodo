import { FC, useActionState, useState } from "react";

import { Subtask, Task, TaskStatus } from "@models";
import { Input } from "@components";
import { useTaskStore } from "@store";

import styles from "../styles/todo.page.module.scss";

interface AddTaskProps {
  addTask: (task: Task) => void;
}

const AddTask: FC<AddTaskProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (title.trim() !== "" && e.key === "Enter") {
      addTask({
        id: Math.random().toString(36),
        title,
        status: TaskStatus.PENDING,
        subtasks: [],
        attachments: [],
      });
      setTitle("");
    }
  };

  return (
    <Input
      type='text'
      placeholder='Add a task. Press enter to save.'
      value={title}
      handleChange={handleOnChange}
      handleKeyDown={handleOnKeyDown}
      className={styles.addTask}
    />
  );
};

export default AddTask;
