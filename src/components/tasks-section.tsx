import { Button } from "~/components/ui/button";
import TaskCreator from "~/components/task-creator";
import { useCoursesContext } from "~/context/courses-context";
import { useGlobalContext } from "~/context/global-context";
import TaskList from "~/components/task-list";
import useDeviceType from "~/hooks/useDeviceType";
import { List } from "lucide-react";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import CourseList from "./course-list";

const TaskSection = () => {
  const { isCreatingTask, setIsCreatingTask } = useGlobalContext();
  const { courses } = useCoursesContext();
  const isSmallScreen = useDeviceType();

  return (
    <div className="flex h-full w-full flex-col">
      {isCreatingTask ? (
        <TaskCreator {...{ setIsCreatingTask }} />
      ) : (
        <>
          {isSmallScreen && (
            <div className="flex justify-center p-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    className="flex w-full items-center justify-center px-4 py-1"
                  >
                    <List className="mr-2 h-6 w-6" />
                    <p>View courses list</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="h-[90vh] rounded-xl dark:bg-slate-900">
                  <CourseList isInModal />
                </DialogContent>
              </Dialog>
            </div>
          )}
          <div className="flex w-full items-center justify-between p-1">
            <h1 className="text-xl font-bold sm:ml-2">Tasks</h1>
            <Button
              className="px-6 sm:mr-3"
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
