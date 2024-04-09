import { FC } from "react";

import { Checkbox } from "@components";
import { Task, TaskStatus } from "@models";

interface TaskProps {
  task: Task;
  completeTask?: (taskId: string, status: TaskStatus) => void;
  subTaskId?: string;
  completeSubTask?: (taskId: string, subTaskId: string, status: TaskStatus) => void;
  taskId: string;
  status?: TaskStatus;
}

const TaskComponent: FC<TaskProps> = ({ task, completeTask, subTaskId, completeSubTask, taskId }) => {
  const handleCompleteTask = () => {
    const status = task.status === TaskStatus.COMPLETED ? TaskStatus.PENDING : TaskStatus.COMPLETED;
    if (subTaskId) {
      completeSubTask && completeSubTask(taskId, subTaskId, status);
    } else {
      completeTask && completeTask(task.id, status);
    }
  };

  return (
    <div>
      <Checkbox checked={task.status === TaskStatus.COMPLETED} label={task.title} handleChange={handleCompleteTask} />
    </div>
  );
};

export default TaskComponent;
