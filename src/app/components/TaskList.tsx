"use client";

import React, { Fragment } from "react";
import ListItem from "./ListItem";
import { Separator } from "@/components/ui/separator";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import Hide from "@/components/Hide";
import { useRecoilValue } from "recoil";
import { TasksActions, TasksState } from "../state";

function TaskList() {
  const tasks = useRecoilValue(TasksState);
  const { replaceTask } = useRecoilValue(TasksActions);

  function handleDragEnd({ destination, source }: DropResult) {
    if (destination) {
      replaceTask({
        sourceIndex: source.index,
        targetIndex: destination.index,
      });
    }
  }
  return (
    <div className="bg-card rounded-lg text-card-foreground shadow-xl">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list">
          {({ innerRef, droppableProps, placeholder }) => (
            <div ref={innerRef} {...droppableProps}>
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(drag, snap) => (
                    <Fragment>
                      <div
                        ref={drag.innerRef}
                        {...drag.draggableProps}
                        {...drag.dragHandleProps}
                      >
                        <ListItem
                          className={
                            snap.isDragging &&
                            "bg-primary text-primary-foreground"
                          }
                          dragging={snap.isDragging}
                          task={task}
                        />
                      </div>
                      <Hide
                        open={
                          index !== tasks.length - 1 &&
                          !(index == 0 && snap.isDragging)
                        }
                      >
                        <Separator />
                      </Hide>
                    </Fragment>
                  )}
                </Draggable>
              ))}
              {placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TaskList;
