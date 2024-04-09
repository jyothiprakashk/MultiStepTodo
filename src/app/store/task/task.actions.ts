import { Attachment, Task, TaskStatus } from "@models";
import { TaskState, TaskStoreActions } from "@store";

export const TaskActions = (set: any): TaskStoreActions => {
  const addTask = (task: Task) => {
    set((state: TaskState) => ({
      ...state,
      tasks: [...state.tasks, task],
    }));
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    set((state: TaskState) => ({
      ...state,
      tasks: state.tasks.map((task) => (task.id !== taskId ? task : { ...task, status })),
    }));
  };

  const updateSubTaskStatus = (taskId: string, subTaskId: string, status: TaskStatus) => {
    set((state: TaskState) => ({
      ...state,
      tasks: state.tasks.map((task: Task) => {
        if (task.id !== taskId) {
          return task;
        }
        // If the task id matches, find the subtask and update its status
        const updatedSubtasks =
          task.subtasks &&
          task.subtasks.map((subtask) => {
            if (subtask.id === subTaskId) {
              return {
                ...subtask,
                status,
              };
            }
            return subtask;
          });
        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      }),
    }));
  };

  const updatedSubtaskList = (updatedTasks: Task[]) => {
    set(() => ({
      tasks: updatedTasks,
    }));
  };

  const updateCurrentTask = (currentTask: object) => {
    set(() => ({
      currentTask,
    }));
  };

  const onUpdateAttachments = (attachment: Attachment[], taskId: string, subTaskId: string) => {
    set((state: TaskState) => ({
      ...state,
      tasks: state.tasks.map((task: Task) => {
        if (subTaskId) {
          // If the task id matches, find the subtask and update its attachments
          return {
            ...task,
            subtasks:
              task.subtasks &&
              task.subtasks.map((subtask) => {
                if (subtask.id === subTaskId) {
                  return {
                    ...subtask,
                    attachments: [...subtask.attachments, ...attachment],
                  };
                }
                return subtask; // Return unchanged subtask if id doesn't match
              }),
          };
        } else if (task.id === taskId) {
          // If the task id matches, update its attachments
          return {
            ...task,
            attachments: [...task.attachments, ...attachment],
          };
        }
        return task; // Return unchanged task if id doesn't match
      }),
    }));
  };

  return { addTask, updateTaskStatus, updateCurrentTask, updatedSubtaskList, updateSubTaskStatus, onUpdateAttachments };
};
