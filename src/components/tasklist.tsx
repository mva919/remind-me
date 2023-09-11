import { useState } from "react";
import Button from "./button";
import TaskCreator from "./taskcreator";
import { useCoursesContext } from "~/context/courses-context";
import { useGlobalContext } from "~/context/global-context";

const TaskList = () => {
  const { isCreatingTask, setIsCreatingTask } = useGlobalContext();
  const { courses } = useCoursesContext();

  return (
    <div className="flex h-full w-full flex-col">
      {isCreatingTask ? (
        <TaskCreator {...{ setIsCreatingTask }} />
      ) : (
        <>
          <div className="flex w-full items-center justify-between p-1">
            <h1 className="ml-2 text-xl font-bold">Tasks</h1>
            <Button
              variant="primary"
              className="px-4"
              onClick={() => setIsCreatingTask(true)}
              isDisabled={!courses.length}
            >
              Add Task
            </Button>
          </div>
          <div className="grow">
            {courses.length ? (
              <div className="flex"></div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p>No courses selected</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
