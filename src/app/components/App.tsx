"use client";

import { Suspense, useEffect } from "react";
import BackgroundImage from "./BackgroundImage";
import CreateTask from "./CreateTask";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import ThemeSwitch from "./ThemeSwitch";
import Profile from "./Profile";
import TaskListSkeleton from "./TaskListSkeleton";
import SyncLocalStore from "./SyncLocalState";

export default function App() {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        } else {
          console.log("Notification permission denied");
        }
      });
    }
  }, []);

  return (
    <main className="block min-h-screen relative mb-5">
      <BackgroundImage />
      <SyncLocalStore />

      <section className="relative z-50 max-w-[540px] mx-auto pt-20 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold tracking-[16px]">
            TODO
          </h1>
          <div className="flex gap-4 items-center">
            <ThemeSwitch />
            <Profile />
          </div>
        </div>

        <div className="mt-12 grid gap-6">
          <CreateTask />

          <Suspense fallback={<TaskListSkeleton />}>
            <TaskList />
          </Suspense>

          <TaskFilter className="bg-card shadow-md rounded-lg md:hidden flex justify-center h-12 items-center" />
        </div>

        <div className="mt-8 text-sm text-center">
          Drag and drop to reorder list
        </div>
      </section>
    </main>
  );
}
