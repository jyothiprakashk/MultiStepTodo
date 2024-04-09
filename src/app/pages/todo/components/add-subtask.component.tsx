import { FC } from "react";

import styles from "../styles/todo.page.module.scss";
import TaskComponent from "./task.component";
import { ImAttachment } from "react-icons/im";
import { Subtask, Task, TaskStatus } from "@models";
import { AttachmentRender } from "./attachment";

const SubtaskContainer: FC<{
  subTasks: Subtask[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, taskId: string, subTaskId: string) => void;
  completeSubTask: (taskId: string, subTaskId: string, status: TaskStatus) => void;
  task: Task;
}> = ({ subTasks, handleFileChange, completeSubTask, task }) => {
  return (
    <div className={styles.subTaskContainer}>
      {subTasks.map((subtask: Subtask) => {
        return (
          <div key={subtask.id}>
            <div className={styles.inputWrapper}>
              <TaskComponent task={subtask} taskId={task.id} completeSubTask={completeSubTask} subTaskId={subtask.id} />
              <input
                type='file'
                multiple
                onChange={(e) => handleFileChange(e, task.id, subtask.id)}
                className={styles.attachmentsInput}
                style={{ display: "none" }}
                id={`${subtask.id}_fileInput`}
              />
              <label htmlFor={`${subtask.id}_fileInput`}>
                <ImAttachment className={styles.svgIcons} />
              </label>
            </div>
            <AttachmentRender attachments={subtask.attachments} />
          </div>
        );
      })}
    </div>
  );
};

export default SubtaskContainer;
