import BackgroundImage from "./components/BackgroundImage";
import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";
import ThemeSwitch from "./components/ThemeSwitch";

export default function Home() {
  return (
    <main className="block min-h-screen relative">
      <BackgroundImage />

      <section className="relative z-50 max-w-[540px] mx-auto pt-20">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold tracking-[16px]">
            TODO
          </h1>
          <ThemeSwitch />
        </div>

        <div className="mt-12 grid gap-6">
          <CreateTask />

          <TaskList />
        </div>
      </section>
    </main>
  );
}
