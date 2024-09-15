import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import {
  TaskCreateFormData,
  TaskCreateFormSchema,
  TaskTypes,
} from "~/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils/cn";
import { useCoursesContext } from "~/context/courses-context";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/text-area";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { api } from "~/lib/utils/api";

interface ITaskCreatorProps {
  setIsCreatingTask: (isCreatingTask: boolean) => void;
}

const TaskCreator = ({ setIsCreatingTask }: ITaskCreatorProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    clearErrors,
  } = useForm<TaskCreateFormData>({
    resolver: zodResolver(TaskCreateFormSchema),
    defaultValues: {
      dueDate: new Date(),
    },
  });
  const ctx = api.useContext();
  const { courses } = useCoursesContext();
  const { mutate } = api.task.create.useMutation({
    onSuccess: () => {
      void ctx.task.get.invalidate();
    },
  });

  const handleTaskCreation = (data: TaskCreateFormData) => {
    mutate(data);
    setIsCreatingTask(false);
  };

  return (
    <form onSubmit={handleSubmit(handleTaskCreation)} className="p-1">
      <div className="flex w-full items-center justify-between">
        <h1 className="ml-2 text-xl font-bold">New Task</h1>
        <div className="flex items-center space-x-6">
          <Button
            variant="destructive"
            className="px-6"
            onClick={() => setIsCreatingTask(false)}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-4 p-2">
        <div className="flex flex-col items-start gap-x-10 gap-y-4 sm:flex-row sm:justify-between">
          <div className="flex w-2/3 flex-col gap-y-2">
            <Label htmlFor="name" className="text-lg">
              Task name
            </Label>
            <Input
              type="text"
              placeholder="Enter task name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex w-1/3 flex-col gap-y-2">
            <Label htmlFor="dueDate" className="text-lg">
              Task due date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full max-w-[280px] justify-start text-left font-normal",
                    !watch("dueDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("dueDate").toDateString() ?? <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("dueDate")}
                  onSelect={(date) => setValue("dueDate", date!)}
                  initialFocus
                  {...register("dueDate")}
                />
              </PopoverContent>
            </Popover>
            {errors.dueDate && (
              <p className="text-red-500">{errors.dueDate.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="description" className="text-lg">
            Task description
          </Label>
          <Textarea
            placeholder="Enter task description"
            className="h-36 resize-none"
            {...register("description")}
          />
        </div>

        <div className="flex flex-grow flex-col gap-y-2">
          <Label htmlFor="courseId" className="text-lg">
            Select course for task
          </Label>
          <Select
            {...register("course", { required: true })}
            onValueChange={(value) => {
              setValue("course", JSON.parse(value));
              clearErrors("course");
            }}
          >
            <SelectTrigger className="w-full max-w-[425px]">
              <SelectValue placeholder="Select course for task">
                {watch("course")?.name || "Select course for task"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={JSON.stringify(course)}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.course && (
            <p className="text-red-500">A course must be selected</p>
          )}
        </div>

        <div className="flex flex-grow flex-col gap-y-2">
          <Label htmlFor="type" className="text-lg">
            Task type
          </Label>
          <Select
            {...register("type")}
            onValueChange={(value) => {
              setValue("type", TaskTypes[value as keyof typeof TaskTypes]);
              clearErrors("type");
            }}
          >
            <SelectTrigger className="w-full max-w-[250px]">
              <SelectValue placeholder="Select task type">
                {TaskTypes[watch("type")] || "Select task type"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.keys(TaskTypes)
                .filter((key) => isNaN(Number(key)))
                .map((type) => (
                  <SelectItem key={type} value={String(type)}>
                    {type}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create task"
          )}
        </Button>
      </div>
    </form>
  );
};

export default TaskCreator;
