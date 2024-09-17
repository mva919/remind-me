import { Button } from "~/components/ui/button";
import TaskCreator from "~/components/task-creator";
import { useCoursesContext } from "~/context/courses-context";
import { useGlobalContext } from "~/context/global-context";
import TaskList from "~/components/task-list";

const TaskSection = () => {
  const { isCreatingTask, setIsCreatingTask } = useGlobalContext();
  const { courses } = useCoursesContext();

  return (
    <div className="flex h-full w-full flex-col">
      {isCreatingTask ? (
        <TaskCreator {...{ setIsCreatingTask }} />
      ) : (
        <>
          <div className="flex w-full items-center justify-between p-1">
            <h1 className="text-xl font-bold sm:ml-2">Tasks</h1>
            <Button
              className="px-4 sm:mr-3"
              onClick={() => setIsCreatingTask(true)}
              disabled={!courses.length}
            >
              Add Task
            </Button>
          </div>
          <TaskList />
        </>
      )}
    </div>
  );
};

export default TaskSection;
