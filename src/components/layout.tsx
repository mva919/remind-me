import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      {props.children}
    </main>
  );
};
