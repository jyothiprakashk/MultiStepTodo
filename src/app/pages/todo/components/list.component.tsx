import { FC, useState } from "react";

import { Input, Text } from "@components";
import { Subtask, Task, TaskStatus } from "@models";
import TaskComponent from "./task.component";
import styles from "../styles/todo.page.module.scss";
import { useTaskStore } from "@store";
import SubtaskContainer from "./add-subtask.component";
import { AttachmentRender } from "./attachment";
import { ImAttachment } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";

interface TaskListProps {
  tasks: Task[];
  completeTask: (taskId: string, status: TaskStatus) => void;
  completeSubTask: (taskId: string, subTaskId: string, status: TaskStatus) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, completeTask, completeSubTask }) => {
  const { updateCurrentTask, updatedSubtaskList, currentTask, onUpdateAttachments } = useTaskStore();
  const [subtask, setSubtask] = useState("");
  const [isInput, setInput] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  if (tasks.length === 0) return <Text content='No tasks available' />;

  const onTaskAddOn = (task: Subtask) => {
    updateCurrentTask(task);
    setInput(!isInput);
  };

  const handleAddSubtask = () => {
    if (subtask.trim() !== "") {
      toggleSubtask({ id: Math.random().toString(36), title: subtask, status: TaskStatus.PENDING, attachments: [] });
      setSubtask("");
    }
  };

  const toggleSubtask = (newSubtask: object) => {
    const updatedTasks = tasks.map((task: any) => {
      if (task.id === currentTask.id) {
        const updatedSubtasks = [...task.subtasks, newSubtask];
        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      }
      return task;
    });
    updatedSubtaskList(updatedTasks);
  };

  const handleSubtaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtask(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, taskId: string, subTaskId: string) => {
    if (e.target.files) {
      const _attachments = [...attachments, ...Array.from(e.target.files)];
      setAttachments(_attachments);
      onUpdateAttachments([...Array.from(e.target.files)], taskId, subTaskId);
    }
  };

  return (
    <div className={styles.list}>
      {tasks.map((task) => {
        const subTasks: Subtask[] = task.subtasks || [];
        return (
          <div key={task.id} className={styles.task}>
            <div
              style={{
                marginBottom: subTasks.length || isInput ? "12px" : "",
              }}
              className={styles.taskContainer}>
              <TaskComponent task={task} completeTask={completeTask} taskId={task.id} />
              <div className={styles.labelContainer}>
                <input
                  type='file'
                  multiple
                  onChange={(e) => handleFileChange(e, task.id, "")}
                  className={styles.attachmentsInput}
                  style={{ display: "none" }}
                  id={`${task.id}_fileInput`}
                />
                <label htmlFor={`${task.id}_fileInput`}>
                  <ImAttachment className={styles.svgIcons} />
                </label>
                <button onClick={() => onTaskAddOn(task)}>
                  <FaPlus className={styles.svgIcons} />
                </button>
              </div>
            </div>
            <AttachmentRender attachments={task.attachments} />

            <div style={{ marginTop: isInput ? "12px" : "" }}>
              <SubtaskContainer
                subTasks={subTasks}
                handleFileChange={handleFileChange}
                completeSubTask={completeSubTask}
                task={task}
              />
            </div>
            {isInput && task.id === currentTask.id ? (
              <div className={styles.addSubtask}>
                <Input
                  type='text'
                  placeholder='Add a subtask. Press enter to save.'
                  value={subtask}
                  handleChange={handleSubtaskChange}
                  handleKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddSubtask();
                      setInput(false);
                    }
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
