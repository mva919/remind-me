import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen w-screen bg-slate-100 dark:bg-slate-900">
      <div className="mx-auto h-full w-full max-w-screen-2xl">
        {props.children}
      </div>
    </main>
  );
};
