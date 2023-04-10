import { api } from "~/utils/api";
import Spinner from "./spinner";
import { ListItem } from "./listitem";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";

export const CourseList = () => {
  const { data, isLoading: coursesLoading } = api.course.getAll.useQuery();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [newCourseName, setNewCourseName] = useState("");
  const parent = useRef<HTMLDivElement>(null);

  const ctx = api.useContext();

  const { mutate, isLoading: isAddingCourse } = api.course.create.useMutation({
    onSuccess: () => {
      setNewCourseName("");
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
        mutate({ name: newCourseName });
        setNewCourseName("");
      }
    }
  };

  return (
    <div
      ref={parent}
      className="flex h-full w-1/6 flex-col border-r border-r-slate-300 p-1 dark:border-r-slate-600"
    >
      <h1 className="flex-none pb-2 text-center text-xl font-bold">Courses</h1>
      {coursesLoading ? (
        <div className="flex flex-auto items-center justify-center">
          <Spinner size={64} />
        </div>
      ) : (
        <div className="flex flex-auto flex-col gap-y-2 overflow-y-scroll">
          {data?.map((course) => (
            <ListItem
              key={course.id}
              {...course}
              selected={selectedCourses.includes(course.id)}
              onPress={() => handleListItemClick(course.id)}
            />
          ))}
        </div>
      )}

      <input
        type="text"
        value={newCourseName}
        placeholder="Add course..."
        className="rounded bg-slate-200 p-2 outline-none dark:bg-slate-800"
        onChange={(e) => setNewCourseName(e.target.value)}
        onKeyDown={(e) => handleAddCourseKeyDown(e)}
        disabled={coursesLoading || isAddingCourse}
      />
      {newCourseName.length > 0 && (
        <button
          className="mt-1 rounded bg-red-600 p-2 text-white transition-all duration-100 hover:scale-95 hover:bg-red-700 active:ring-2 active:ring-black dark:active:ring-slate-100"
          onClick={() => mutate({ name: newCourseName })}
        >
          Add Course
        </button>
      )}
    </div>
  );
};
