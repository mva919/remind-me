import { useCoursesContext } from "~/context/courses-context";
import { useGlobalContext } from "~/context/global-context";
import { api } from "~/lib/utils/api";
import Spinner from "~/components/spinner";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Checkbox } from "./ui/checkbox";
import { TaskTypes } from "~/lib/types";
import { Badge } from "./ui/badge";

const TaskList = () => {
  const { isCreatingTask, setIsCreatingTask } = useGlobalContext();
  const { courses } = useCoursesContext();
  const {
    data: tasks,
    isLoading,
    isRefetching,
  } = api.task.get.useQuery(courses.map((course) => course.id));

  return (
    <div className="grow overflow-scroll ">
      {courses.length ? (
        isLoading || isRefetching ? (
          <div className="flex h-full items-center justify-center">
            <Spinner size={100} />
          </div>
        ) : tasks ? (
          <div className="mt-2 flex flex-col gap-y-2 overflow-scroll px-1 sm:px-3">
            {tasks.map((task) => (
              <div className="flex cursor-pointer items-center gap-x-4 overflow-scroll rounded border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-900 hover:dark:bg-slate-800">
                <Checkbox />
                <p className="grow">{task.name}</p>
                <p className="w-[100px]">
                  {task.dueDate.toDateString().split(" ").slice(1).join(" ")}
                </p>
                <div className="flex w-[80px] justify-center">
                  <Badge variant="outline">
                    {TaskTypes[task.type as keyof typeof TaskTypes]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p>There are no tasks for this course.</p>
          </div>
        )
      ) : (
        <div className="flex h-full items-center justify-center">
          <p>No courses selected</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
