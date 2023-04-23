import type { PropsWithChildren } from "react";

const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="h-screen min-h-screen w-screen bg-slate-100 dark:bg-slate-900">
      <div className="relative mx-auto flex h-full w-full max-w-screen-2xl flex-col">
        {props.children}
      </div>
    </main>
  );
};

export default PageLayout;
