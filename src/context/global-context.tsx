import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  useContext,
} from "react";

export type TGlobalContext = {
  isCreatingTask: boolean;
  setIsCreatingTask: Dispatch<SetStateAction<boolean>>;
};

export const GlobalContext = createContext<TGlobalContext | null>(null);

interface IGlobalContextProviderProps {
  children: React.ReactNode;
}

export default function GlobalContextProvider({
  children,
}: IGlobalContextProviderProps) {
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  return (
    <GlobalContext.Provider value={{ isCreatingTask, setIsCreatingTask }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const ctx = useContext(GlobalContext);

  if (!ctx) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }

  return ctx;
}
