import { createSelector } from "reselect";

import { TaskState } from "@store";

export const selectTasks = createSelector(
    (state: TaskState) => state,
    (state: TaskState) => state.tasks
);
