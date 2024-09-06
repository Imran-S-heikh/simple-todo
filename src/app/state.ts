import {
  deleteTodo,
  getTodos,
  insertTodo,
  todosRef,
  updateTodo,
} from "@/lib/database";
import { auth } from "@/lib/firebase";
import { Task, UserInfo } from "@/lib/types";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { atom, atomFamily, DefaultValue, selector } from "recoil";

interface ReplaceProps {
  sourceIndex: number;
  targetIndex: number;
}

export enum TaskFilterType {
  All = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export const TASKS_KEY = "TASKS";

export const TasksState = atomFamily<Task[], string | undefined>({
  key: "TASKS_STATE",
  default: (userId) =>
    new Promise(async (set) => {
      if (!userId) return set([] as never);

      const todos = await getTodos(userId).catch(() => [] as never);

      set(todos);
    }),

  effects(userId) {
    return [
      ({ setSelf, getPromise, node }) => {
        if (userId) {
          onSnapshot(query(todosRef(userId)), (snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
              if (change.type === "added") {
                await getPromise(node);
                setSelf((pre) => {
                  if (
                    pre instanceof DefaultValue ||
                    pre.find((item) => item.id === change.doc.id)
                  ) {
                    return pre;
                  }
                  const newTask = {
                    id: change.doc.id,
                    ...change.doc.data(),
                  } as Task;
                  return [...pre, newTask];
                });
              }

              if (change.type === "removed") {
                return setSelf((pre) => {
                  if (pre instanceof DefaultValue) {
                    return pre;
                  }
                  return pre.filter((task) => task.id !== change.doc.id);
                });
              }

              if (change.type === "modified") {
                setSelf((pre) => {
                  if (pre instanceof DefaultValue) {
                    return pre;
                  }
                  const modifiedTask = {
                    id: change.doc.id,
                    ...change.doc.data(),
                  } as Task;
                  return [
                    ...pre.map((task) =>
                      task.id === modifiedTask.id ? modifiedTask : task
                    ),
                  ];
                });
              }
            });
          });
        }
      },
    ];
  },
});

export const TasksActions = selector({
  key: "TASKS_ACTIONS",
  get({ getCallback }) {
    const replaceTask = getCallback(
      ({ set, snapshot }) =>
        async ({ sourceIndex, targetIndex }: ReplaceProps) => {
          const user = await snapshot.getPromise(UserState);
          if (user) {
            set(TasksState(user?.uid), (pre) => {
              const tasks = Array.from(pre);
              const [dragged] = tasks.splice(sourceIndex, 1);
              tasks.splice(targetIndex, 0, dragged);
              return tasks;
            });
          }
        }
    );

    const addTask = getCallback(({ set, snapshot }) => async (name: string) => {
      const user = await snapshot.getPromise(UserState);
      const task = {
        name,
        completed: false,
        createdAt: Date.now(),
      };
      user && insertTodo(user.uid, task);
    });

    const removeTask = getCallback(
      ({ set, snapshot }) =>
        async (id: string) => {
          const user = await snapshot.getPromise(UserState);
          user && deleteTodo(user.uid, id);
          // set(TasksState(user?.uid), (pre) =>
          //   pre.filter((task) => task.id !== id)
          // );
        }
    );

    const toggleTask = getCallback(
      ({ set, snapshot }) =>
        async (id: string, state: boolean) => {
          const user = await snapshot.getPromise(UserState);
          user && updateTodo(user.uid, id, { completed: state });
          // set(TasksState(user?.uid), (pre) =>
          //   [...pre].map((task) =>
          //     task.id === id ? { ...task, completed: !task.completed } : task
          //   )
          // );
        }
    );

    const clearCompleted = getCallback(({ set, snapshot }) => async () => {
      const user = await snapshot.getPromise(UserState);
      set(TasksState(user?.uid), (pre) =>
        [...pre].filter((task) => !task.completed)
      );
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
    const user = get(UserState);
    const tasks = get(TasksState(user?.uid));
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
    const user = get(UserState);
    const tasks = get(TasksState(user?.uid));
    const active = tasks.filter((task) => !task.completed).length;
    return {
      active,
      completed: tasks.length - active,
    };
  },
});

export const UserState = atom<UserInfo | null>({
  key: "USER_STATE",
  default: null,
  effects: [
    ({ setSelf }) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setSelf({
            uid: user.uid,
            displayName: user.displayName!,
            email: user.email!,
            photoURL: user.photoURL!,
          });
        } else {
          setSelf(null);
        }
      });
    },
  ],
});
