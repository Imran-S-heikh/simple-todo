import { atom, selector } from "recoil";

export interface Task {
  id: number;
  name: string;
}

interface ReplaceProps {
  sourceIndex: number;
  targetIndex: number;
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
        },
      ]);
    });

    const removeTask = getCallback(({ set }) => async (id: number) => {
      set(TasksState, (pre) => pre.filter((task) => task.id !== id));
    });

    return {
      replaceTask,
      addTask,
      removeTask,
    };
  },
});
