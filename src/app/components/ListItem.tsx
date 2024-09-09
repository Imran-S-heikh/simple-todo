import IconCross from "@/assets/icons/IconCross";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React, { useEffect, useState } from "react";
import GradientIcon from "./GradientIcon";
import { TasksActions } from "../state";
import { useRecoilValue } from "recoil";
import { Task } from "@/lib/types";
import Hide from "@/components/Hide";
import { timeRemain } from "@/lib/time-difference";

function ListItem({
  className,
  dragging,
  task,
}: {
  className?: ClassValue;
  dragging?: boolean;
  task: Task;
}) {
  const { removeTask, toggleTask } = useRecoilValue(TasksActions);
  const [time, setTime] = useState("");

  React.useEffect(() => {
    if (!task.endTime || task.completed) {
      return setTime("");
    }

    const interval = setInterval(() => {
      if (task.endTime) {
        const diff = task.endTime - Date.now();
        if (diff > 0) {
          setTime(timeRemain(diff, 2));
        } else {
          setTime("Time's up!");
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [task.endTime, task.completed]);

  return (
    <div
      className={cn(
        "flex min-h-14 items-center bg-card rounded-lg duration-150",
        className
      )}
    >
      <GradientIcon
        onClick={() => toggleTask(task.id, !task.completed)}
        childClass={dragging && "bg-primary border-white"}
        active={task.completed}
      />
      <p className="flex-1 h-auto my-auto py-2">{task.name}</p>
      <Hide open={time}>
        <span>{time}</span>
      </Hide>
      <Button
        onClick={() => removeTask(task.id)}
        size="icon"
        variant="ghost"
        className="h-auto w-auto px-4 md:opacity-0 hover:opacity-100 hover:bg-transparent group"
      >
        <span className="group-active:opacity-50">
          <IconCross className="pointer-events-none fill-muted" />
        </span>
      </Button>
    </div>
  );
}

export default ListItem;
