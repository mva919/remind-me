import { api } from "~/lib/utils/api";
import Spinner from "~/components/spinner";
import ListItem from "~/components/list-item";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { ChevronFirst, Pencil, Trash2, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { toast } from "react-hot-toast";
import useDeviceType from "~/hooks/useDeviceType";
import { useCoursesContext } from "~/context/courses-context";
import { useGlobalContext } from "~/context/global-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Input } from "~/components/ui/input";

export interface CourseProps {
  isInModal?: boolean;
  setIsExpanded?: Dispatch<SetStateAction<boolean>>;
}

const CourseList = ({ setIsExpanded, isInModal }: CourseProps) => {
  const { data: courses, isLoading: coursesLoading } =
    api.course.getAll.useQuery();
  const [newCourseName, setNewCourseName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const parent = useRef<HTMLDivElement>(null);
  const isSmallScreen = useDeviceType();
  const { courses: selectedCourses, setCourses: setSelectedCourses } =
    useCoursesContext();
  const { isCreatingTask } = useGlobalContext();

  const ctx = api.useContext();

  const { mutate: addCourse, isLoading: isAddingCourse } =
    api.course.create.useMutation({
      onSuccess: () => {
        void ctx.course.getAll.invalidate();
        setNewCourseName("");
      },
    });

  const { mutate: deleteCourse } = api.course.delete.useMutation({
    onSuccess: () => {
      void ctx.course.getAll.invalidate();
    },
  });

  const handleListItemClick = (id: string) => {
    if (!courses) return;

    const selectedCoursesId = selectedCourses.map((course) => course.id);
    if (selectedCoursesId.includes(id)) {
      if (isCreatingTask && selectedCourses.length === 1) {
        toast.error(
          "Must have at least one course selected while creating a task.",
          {
            style: {
              backgroundColor: "#b91c1c",
              color: "#f8fafc",
            },
          }
        );
        return;
      }
      setSelectedCourses((prev) => prev.filter((course) => course.id !== id));
      return;
    }

    const newSelectedCourse = courses.find((course) => course.id === id);
    if (!newSelectedCourse) return;
    setSelectedCourses((prev) => [...prev, newSelectedCourse]);
  };

  const handleAddCourseKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newCourseName.length > 0) {
        setIsCreating(true);
        addCourse({ name: newCourseName });
        setNewCourseName("");
        setIsCreating(false);
      }
    }
  };

  const handleAddCourseBtnClick = () => {
    if (newCourseName.length > 0) {
      setIsCreating(true);
      addCourse({ name: newCourseName });
      setNewCourseName("");
      setIsCreating(false);
    }
  };

  const handleCoursesDelete = () => {
    setIsDeleting(true);
    selectedCourses.forEach((course) => {
      deleteCourse(course.id);
    });
    setSelectedCourses([]);
    setIsDeleting(false);
    toast.success("Course(s) deleted successfully!", {
      style: {
        backgroundColor: "#047857",
        color: "#f8fafc",
      },
    });
    setIsEditing(false);
  };

  const handleCollapse = () => {
    if (setIsExpanded) setIsExpanded((prev) => !prev);
    setIsEditing(false);
    setNewCourseName("");
  };

  return (
    <div className="flex h-full flex-col">
      <div>
        <div className="flex items-center justify-between pb-2">
          <h1 className="pb-2 text-xl font-bold">Courses</h1>
          {!isInModal && (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (setIsExpanded) setIsExpanded((prev) => !prev);
                    }}
                  >
                    <ChevronFirst size={24} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Collapse course list</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            setIsEditing((prev) => !prev);
          }}
          className="mb-3 flex w-full items-center gap-2"
        >
          {isEditing ? (
            <div className="flex flex-row items-center space-x-2">
              <X size={20} />
              <p>Cancel</p>
            </div>
          ) : (
            <>
              <Pencil size={16} />
              <p>Edit Course List</p>
            </>
          )}
        </Button>
      </div>

      {coursesLoading || isCreating || isDeleting ? (
        <div className="flex grow items-center justify-center">
          <Spinner size={64} />
        </div>
      ) : (
        <div className="mb-1 flex grow basis-0 flex-col gap-y-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          {courses?.map((course) => (
            <ListItem
              key={`course-${course.id}`}
              {...course}
              selected={selectedCourses.includes(course)}
              onClick={handleListItemClick}
            />
          ))}
        </div>
      )}

      <div className="mt-1 w-full">
        {isEditing && (
          <Button
            variant="destructive"
            className="mb-1 flex w-full items-center justify-center gap-2"
            disabled={selectedCourses.length === 0}
            onClick={handleCoursesDelete}
          >
            <Trash2 size={16} />
            <p>{`Delete ${
              selectedCourses.length !== 0 ? selectedCourses.length : ""
            }`}</p>
          </Button>
        )}
        <Input
          type="text"
          placeholder="Add course"
          onChange={(e) => setNewCourseName(e.currentTarget.value)}
          onKeyDown={(e) => handleAddCourseKeyDown(e)}
          disabled={coursesLoading || isAddingCourse}
          value={newCourseName}
        />

        {newCourseName.length > 0 && (
          <Button className="mt-2 w-full" onClick={handleAddCourseBtnClick}>
            Add Course
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseList;
