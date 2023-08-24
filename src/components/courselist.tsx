import { api } from "~/utils/api";
import Spinner from "./spinner";
import ListItem from "./listitem";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { ChevronFirst, ChevronLast, Pencil, Trash2 } from "lucide-react";
import Button from "./button";
import { toast } from "react-hot-toast";
import useDeviceType from "~/hooks/useDeviceType";

const CourseList = () => {
  const { data, isLoading: coursesLoading } = api.course.getAll.useQuery();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const parent = useRef<HTMLDivElement>(null);
  const isSmallScreen = useDeviceType();
  const [isExpanded, setIsExpanded] = useState(!isSmallScreen);

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

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const handleListItemClick = (id: string) => {
    if (selectedCourses.includes(id)) {
      setSelectedCourses((prev) => prev.filter((course) => course !== id));
    } else {
      setSelectedCourses((prev) => [...prev, id]);
    }
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
      deleteCourse(course);
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
    setIsExpanded(!isExpanded);
    setIsEditing(false);
    setNewCourseName("");
  };

  return (
    <div
      ref={parent}
      className={`${
        isExpanded ? "w-fit" : "w-80"
      } flex h-full flex-col border-r border-r-slate-300 p-1 dark:border-r-slate-600`}
    >
      {isExpanded ? (
        <Button onClick={() => setIsExpanded(!isExpanded)}>
          <ChevronLast size={24} />
        </Button>
      ) : (
        <>
          <div>
            <div className="flex items-center justify-between">
              <h1 className="pb-2 pl-3 text-center text-xl font-bold">
                Courses
              </h1>
              <Button onClick={handleCollapse}>
                <ChevronFirst size={24} />
              </Button>
            </div>
            <Button
              onClick={() => {
                setIsEditing((prev) => !prev);
              }}
              className={`mb-3 flex w-full items-center gap-2 ${
                isEditing
                  ? "bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-600"
                  : ""
              }`}
            >
              <Pencil size={16} />
              <p>Edit Course List</p>
            </Button>
          </div>

          {coursesLoading || isCreating || isDeleting ? (
            <div className="flex grow items-center justify-center">
              <Spinner size={64} />
            </div>
          ) : (
            <div className="mb-1 flex grow basis-0 flex-col gap-y-2 overflow-y-scroll p-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
              {data?.map((course) => (
                <ListItem
                  key={`course-${course.id}`}
                  {...course}
                  selected={selectedCourses.includes(course.id)}
                  onClick={handleListItemClick}
                />
              ))}
            </div>
          )}

          <div>
            {isEditing && (
              <Button
                variant="primary"
                className="mb-1 flex w-full items-center justify-center gap-2"
                isDisabled={selectedCourses.length === 0}
                onClick={handleCoursesDelete}
              >
                <Trash2 size={16} />
                <p>{`Delete ${
                  selectedCourses.length !== 0 ? selectedCourses.length : ""
                }`}</p>
              </Button>
            )}
            <input
              type="text"
              value={newCourseName}
              placeholder="Add course..."
              className="w-full flex-none rounded bg-slate-200 p-2 outline-none dark:bg-slate-800"
              onChange={(e) => setNewCourseName(e.target.value)}
              onKeyDown={(e) => handleAddCourseKeyDown(e)}
              disabled={coursesLoading || isAddingCourse}
            />
            {newCourseName.length > 0 && (
              <Button
                variant="primary"
                className="mt-1 w-full"
                onClick={handleAddCourseBtnClick}
              >
                Add Course
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CourseList;
