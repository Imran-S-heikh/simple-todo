import Hide from "@/components/Hide";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

function TaskListSkeleton() {
  return (
    <div className="bg-background rounded-lg shadow-lg">
      <Skeleton className="bg-card rounded-lg flex flex-col overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <Fragment key={i}>
            <Hide open={i !== 1}>
              <Separator />
            </Hide>
            <Skeleton className="min-h-14 bg-background rounded-none px-3 flex items-center gap-3">
              <Skeleton className="w-7 h-7 rounded-full" />
              <div className="flex-1 flex flex-col gap-1">
                <Skeleton className="bg-card w-32 h-2 rounded-[2px]" />
                <Skeleton className="bg-card w-60 h-2 rounded-[2px]" />
              </div>
            </Skeleton>
          </Fragment>
        ))}
      </Skeleton>
    </div>
  );
}

export default TaskListSkeleton;
