"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { useRecoilState } from "recoil";
import { TaskFilterState, TaskFilterType } from "../state";

function TaskFilter({ className }: { className?: string }) {
  const [filter, setFilter] = useRecoilState(TaskFilterState);
  return (
    <div className={cn(className)}>
      {Object.values(TaskFilterType).map((action) => (
        <Button
          variant="ghost"
          className={cn("capitalize px-2", filter === action && "text-primary")}
          onClick={() => setFilter(action)}
          key={action}
        >
          {action.toLowerCase()}
        </Button>
      ))}
    </div>
  );
}

export default TaskFilter;
