import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ICourseContextProviderProps {
  children: React.ReactNode;
}

export type TCourse = {
  id: string;
  name: string;
};

type TCoursesContext = {
  courses: TCourse[];
  setCourses: Dispatch<SetStateAction<TCourse[]>>;
};

export const CoursesContext = createContext<TCoursesContext | null>(null);

export default function CoursesContextProvider({
  children,
}: ICourseContextProviderProps) {
  const [courses, setCourses] = useState<TCourse[]>([]);

  return (
    <CoursesContext.Provider value={{ courses, setCourses }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCoursesContext() {
  const ctx = useContext(CoursesContext);

  if (!ctx) {
    throw new Error(
      "useCoursesContext must be used within a CoursesContextProvider"
    );
  }

  return ctx;
}
