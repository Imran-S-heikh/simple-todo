import { atom, selector } from "recoil";

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface ReplaceProps {
  sourceIndex: number;
  targetIndex: number;
}

export enum TaskFilterType {
  All = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export const TasksState = atom<Task[]>({
  key: "TASKS_STATE",
  default: [],
});

export const TasksActions = selector({
  key: "TASKS_ACTIONS",
  get({ getCallback }) {
    const replaceTask = getCallback(
      ({ set }) =>
        ({ sourceIndex, targetIndex }: ReplaceProps) =>
          set(TasksState, (pre) => {
            const tasks = Array.from(pre);
            const [dragged] = tasks.splice(sourceIndex, 1);
            tasks.splice(targetIndex, 0, dragged);
            return tasks;
          })
    );

    const addTask = getCallback(({ set }) => async (task: string) => {
      set(TasksState, (pre) => [
        ...pre,
        {
          id: Math.round(Math.random() * 100000000000000),
          name: task,
          completed: false,
        },
      ]);
    });

    const removeTask = getCallback(({ set }) => async (id: number) => {
      set(TasksState, (pre) => pre.filter((task) => task.id !== id));
    });

    const toggleTask = getCallback(({ set }) => (id: number) => {
      set(TasksState, (pre) =>
        [...pre].map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    });

    const clearCompleted = getCallback(({ set }) => () => {
      set(TasksState, (pre) => [...pre].filter((task) => !task.completed));
    });

    return {
      replaceTask,
      addTask,
      removeTask,
      toggleTask,
      clearCompleted,
    };
  },
});

export const TaskFilterState = atom({
  key: "TASK_FILTER_STATE",
  default: TaskFilterType.All,
});

export const TasksFilteredState = selector({
  key: "TASKS_FILTERED_STATE",
  get({ get }) {
    const tasks = get(TasksState);
    const filter = get(TaskFilterState);

    switch (filter) {
      case TaskFilterType.ACTIVE:
        return tasks.filter((task) => !task.completed);
      case TaskFilterType.COMPLETED:
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  },
});

export const TasksStatsState = selector({
  key: "TASKS_STATS_STATE",
  get({ get }) {
    const tasks = get(TasksState);
    const active = tasks.filter((task) => !task.completed).length;
    return {
      active,
      completed: tasks.length - active,
    };
  },
});
