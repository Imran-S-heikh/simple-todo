import IconCross from "@/assets/icons/IconCross";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";
import GradientIcon from "./GradientIcon";
import { Task, TasksActions } from "../state";
import { useRecoilValue } from "recoil";

function ListItem({
  className,
  dragging,
  task,
}: {
  className?: ClassValue;
  dragging?: boolean;
  task: Task;
}) {
  const { removeTask } = useRecoilValue(TasksActions);

  return (
    <div
      className={cn(
        "flex h-14 items-stretch bg-card rounded-lg duration-150",
        className
      )}
    >
      <GradientIcon childClass={dragging && "bg-primary border-white"} />
      <p className="flex-1 h-auto my-auto">{task.name}</p>
      <Button
        onClick={() => removeTask(task.id)}
        size="icon"
        variant="ghost"
        className="h-auto w-auto px-4 opacity-0 hover:opacity-100 hover:bg-transparent group"
      >
        <span className="group-active:opacity-50">
          <IconCross className="pointer-events-none" />
        </span>
      </Button>
    </div>
  );
}

export default ListItem;
