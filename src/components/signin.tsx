import { SignInButton } from "@clerk/nextjs";

export const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-8">
      <div className="flex flex-col items-start">
        <span className="text-4xl">👋</span>
        <h1 className="text-4xl font-bold dark:text-slate-100">
          Welcome to Remind me!
        </h1>
      </div>
      <p className="text-lg dark:text-slate-100">
        Please sign in to start keeping track of all your school tasks!
      </p>
      <SignInButton>
        <button className="rounded bg-red-600 px-16 py-2 text-lg font-semibold text-slate-100 transition-all duration-100 hover:scale-95 hover:bg-red-700 active:ring-2 active:ring-black dark:active:ring-slate-100">
          Sign in
        </button>
      </SignInButton>
    </div>
  );
};
