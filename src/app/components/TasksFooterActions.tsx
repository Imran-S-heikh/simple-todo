import { Button } from "@/components/ui/button";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  TaskFilterState,
  TaskFilterType,
  TasksActions,
  TasksStatsState,
} from "../state";
import { cn } from "@/lib/utils";
import TaskFilter from "./TaskFilter";

function TaskFooter() {
  const { clearCompleted } = useRecoilValue(TasksActions);
  const { active } = useRecoilValue(TasksStatsState);

  return (
    <div className="flex justify-between items-center px-3 py-2">
      <h4 className="ml-3 text-muted flex">
        <span className="min-w-4 block">{active}</span> items left
      </h4>
      <div className="hidden md:block">
        <TaskFilter />
      </div>
      <Button variant="ghost" onClick={clearCompleted}>
        Clear Completed
      </Button>
    </div>
  );
}

export default TaskFooter;
