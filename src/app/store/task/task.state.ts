import { TaskStatus } from "@models";

import { TaskStoreAttributes } from "./task.types";

export const TaskInitialState: TaskStoreAttributes = {
  tasks: [],
  currentTask: {},
};
