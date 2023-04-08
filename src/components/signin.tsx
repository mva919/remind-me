import { SignInButton } from "@clerk/nextjs";

export const SignIn = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold">👋 Welcome to Remind me!</h1>
      <p className="text-lg">
        Please sign in to start keeping track of all your school tasks!
      </p>
      <SignInButton>
        <button className="rounded bg-red-600 px-16 py-2 text-lg font-semibold text-slate-100 transition-all duration-100 hover:scale-95 hover:bg-red-700">
          Sign in
        </button>
      </SignInButton>
    </div>
  );
};
