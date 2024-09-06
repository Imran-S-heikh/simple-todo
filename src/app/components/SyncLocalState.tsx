import { TASKS_KEY, TasksState, UserState } from "@/app/state";
import { todoRef, todosRef } from "@/lib/database";
import { db } from "@/lib/firebase";
import { Task, UserInfo } from "@/lib/types";
import { writeBatch } from "firebase/firestore";
import { useEffect } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

function SyncLocalStore() {
  const user = useRecoilValue(UserState);
  const sync = useRecoilCallback(({ snapshot }) => async (user: UserInfo) => {
    const localtasks = JSON.parse(
      localStorage.getItem(TASKS_KEY) || "[]"
    ) as Task[];

    if (localtasks.length > 0) {
      const tasks = await snapshot.getPromise(TasksState(user.uid));
      const ids = tasks.map((task) => task.id);
      const filtered = localtasks.filter((task) => !ids.includes(task.id));
      const batch = writeBatch(db);

      for (const task of filtered) {
        batch.set(todoRef(user.uid, task.id), task);
      }

      await batch.commit();
      localStorage.removeItem(TASKS_KEY);
    }
  });
  useEffect(() => {
    if (user) {
      sync(user);
    }
  }, [user]);
  return null;
}

export default SyncLocalStore;
