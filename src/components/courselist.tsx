import { api } from "~/utils/api";
import Spinner from "./spinner";
import { ListItem } from "./listitem";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { X } from "lucide-react";

export const CourseList = () => {
  const { data, isLoading: coursesLoading } = api.course.getAll.useQuery();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [newCourseName, setNewCourseName] = useState("");
  const parent = useRef<HTMLDivElement>(null);

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
        addCourse({ name: newCourseName });
        setNewCourseName("");
      }
    }
  };

  const handleListItemDelete = (id: string) => {
    deleteCourse(id);
    setSelectedCourses((prev) => prev.filter((course) => course !== id));
  };

  return (
    <div
      ref={parent}
      className="flex h-full w-1/6 flex-col border-r border-r-slate-300 p-1 dark:border-r-slate-600"
    >
      <h1 className="pb-2 text-center text-xl font-bold">Courses</h1>

      {coursesLoading ? (
        <div className="flex grow items-center justify-center">
          <Spinner size={64} />
        </div>
      ) : (
        <div className="mb-1 flex grow basis-0 flex-col gap-y-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          {data?.map((course) => (
            <div key={course.id} className="group flex items-center gap-1">
              <button
                className="hidden h-full w-8 items-center justify-center rounded bg-red-600 text-center group-hover:flex"
                onClick={() => handleListItemDelete(course.id)}
              >
                <X className="h-full w-full rounded text-white transition-all duration-200 hover:bg-red-600 hover:text-white active:outline active:outline-2 active:outline-white" />
              </button>
              <ListItem
                key={`course-${course.id}`}
                {...course}
                selected={selectedCourses.includes(course.id)}
                onPress={handleListItemClick}
                onDelete={handleListItemDelete}
              />
            </div>
          ))}
        </div>
      )}

      <input
        type="text"
        value={newCourseName}
        placeholder="Add course..."
        className="flex-none rounded bg-slate-200 p-2 outline-none dark:bg-slate-800"
        onChange={(e) => setNewCourseName(e.target.value)}
        onKeyDown={(e) => handleAddCourseKeyDown(e)}
        disabled={coursesLoading || isAddingCourse}
      />
      {newCourseName.length > 0 && (
        <button
          className="mt-1 rounded bg-red-600 p-2 text-white transition-all duration-100 hover:scale-95 hover:bg-red-700 active:ring-2 active:ring-black dark:active:ring-slate-100"
          onClick={() => addCourse({ name: newCourseName })}
        >
          Add Course
        </button>
      )}
    </div>
  );
};
