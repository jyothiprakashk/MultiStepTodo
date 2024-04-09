import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { TaskActions } from "./task.actions";
import { TaskInitialState } from "./task.state";
import { TaskState } from "./task.types";

export const useTaskStore = create<TaskState>()(
    immer((set) => ({
        ...TaskInitialState,
        ...TaskActions(set),
    }))
);
