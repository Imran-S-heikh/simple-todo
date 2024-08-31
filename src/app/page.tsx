import BackgroundImage from "./components/BackgroundImage";
import CreateTask from "./components/CreateTask";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import ThemeSwitch from "./components/ThemeSwitch";

export default function Home() {
  return (
    <main className="block min-h-screen relative mb-5">
      <BackgroundImage />

      <section className="relative z-50 max-w-[540px] mx-auto pt-20 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold tracking-[16px]">
            TODO
          </h1>
          <ThemeSwitch />
        </div>

        <div className="mt-12 grid gap-6">
          <CreateTask />

          <TaskList />

          <TaskFilter className="bg-card shadow-md rounded-lg md:hidden flex justify-center h-12 items-center" />
        </div>

        <div className="mt-8 text-sm text-center">
          Drag and drop to reorder list
        </div>
      </section>
    </main>
  );
}
