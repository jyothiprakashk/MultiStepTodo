export enum TaskStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  subtasks?: Subtask[];
  attachments: Attachment[];
}

export interface Subtask {
  id: string;
  title: string;
  status: TaskStatus;
  attachments: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  fileUrl: string;
}
