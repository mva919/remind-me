import { useCoursesContext } from "~/context/courses-context";
import Button from "./button";
import Dropdown from "./dropdown";
import TextArea from "./textarea";
import TextInput from "./textinput";
import Select from "./select";
import { TASK_TYPES } from "~/constants/task-types";

interface ITaskCreatorProps {
  setIsCreatingTask: (isCreatingTask: boolean) => void;
}

const TaskCreator = ({ setIsCreatingTask }: ITaskCreatorProps) => {
  const { courses } = useCoursesContext();
  console.log(courses);

  return (
    <div className="p-1">
      <div className="flex w-full items-center justify-between">
        <h1 className="ml-2 text-xl font-bold">New Task</h1>
        <div className="flex items-center space-x-6">
          <Button variant="primary" className="bg-indigo-600 px-6">
            Create Task
          </Button>
          <Button
            variant="primary"
            className="px-6"
            onClick={() => setIsCreatingTask(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
      <form
        className="flex flex-col space-y-4 p-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="task-name" className="text-lg font-semibold">
            Task Name
          </label>
          <TextInput id="task-name" placeholder="Enter task name..." />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="task-description" className="text-lg font-semibold">
            Task Description
          </label>
          <TextArea
            id="task-description"
            placeholder="Enter task description..."
          />
        </div>
        <div>
          <label htmlFor="task-type" className="text-lg font-semibold">
            Select Task Type
          </label>
          <Select options={TASK_TYPES} defaultValue="Select task type" />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="task-courses" className="text-lg font-semibold">
            Select Course(s)
          </label>
          <Dropdown
            text="Select the course(s) for this task"
            options={courses.map((course) => course.name)}
          />
        </div>
      </form>
    </div>
  );
};

export default TaskCreator;
