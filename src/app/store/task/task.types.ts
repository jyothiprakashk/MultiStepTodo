import { Subtask, Task, TaskStatus } from "@models";

export interface TaskStoreAttributes {
  tasks: Task[];
  currentTask: {};
}

export interface TaskStoreActions {
  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  updateCurrentTask: (currentTask: Subtask) => void;
  updatedSubtaskList: (tasks: any) => void;
  updateSubTaskStatus: (taskId: string, subTaskId: string, status: TaskStatus) => void;
  onUpdateAttachments: (attachment: any, taskId: string, subTaskId: string) => void;
}

export interface TaskState extends TaskStoreActions, TaskStoreAttributes {}
