import { api } from "~/utils/api";
import Spinner from "./spinner";
import ListItem from "./listitem";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { X } from "lucide-react";
import Button from "./button";
import { toast } from "react-hot-toast";

const CourseList = () => {
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
    toast.custom(<div>Success</div>);
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
              <Button
                variant="primary"
                className="hidden group-hover:flex"
                onClick={() => handleListItemDelete(course.id)}
              >
                <X />
              </Button>
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
        <Button
          variant="primary"
          className="mt-1"
          onClick={() => addCourse({ name: newCourseName })}
        >
          Add Course
        </Button>
      )}
    </div>
  );
};

export default CourseList;
