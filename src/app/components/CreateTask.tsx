"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import GradientIcon from "./GradientIcon";
import { useRecoilValue } from "recoil";
import { TasksActions } from "../state";
import TimePicker from "@/components/TimePicker";

function CreateTask() {
  const [task, setTask] = React.useState("");
  const [time, setTime] = React.useState<number | null>(null);
  const { addTask } = useRecoilValue(TasksActions);

  function handleAdd() {
    if (task) {
      addTask({ name: task, endTime: time });
      setTask("");
    }
  }

  return (
    <div className="flex bg-card text-card-foreground rounded-lg items-stretch h-16 shadow ">
      <GradientIcon onClick={handleAdd} className="active:opacity-50" />
      <Input
        value={task}
        onChange={(e) => setTask(e.currentTarget.value)}
        className="flex-1 bg-transparent h-auto border-none text-base pl-0"
        placeholder="Task Name..."
        onKeyUp={(e) => e.key === "Enter" && handleAdd()}
      />
      <TimePicker onSelect={setTime} />
    </div>
  );
}

export default CreateTask;
