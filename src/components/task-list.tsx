import { useCoursesContext } from "~/context/courses-context";
import { useGlobalContext } from "~/context/global-context";
import { api } from "~/lib/utils/api";
import Spinner from "./spinner";

const TaskList = () => {
  const { isCreatingTask, setIsCreatingTask } = useGlobalContext();
  const { courses } = useCoursesContext();
  const {
    data: tasks,
    isLoading,
    isRefetching,
  } = api.task.get.useQuery(courses.map((course) => course.id));

  return (
    <div className="grow overflow-scroll">
      {courses.length ? (
        isLoading || isRefetching ? (
          <div className="flex h-full items-center justify-center">
            <Spinner size={100} />
          </div>
        ) : tasks ? (
          <div>
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div>
                  <h1>{task.name}</h1>
                  <p>{task.description}</p>
                </div>
                <div>
                  <p>{String(task.dueDate)}</p>
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
