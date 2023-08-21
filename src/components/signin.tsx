import { SignInButton } from "@clerk/nextjs";
import Button from "./button";

const SignIn = () => {
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
        <Button variant="primary" className="px-16 py-2 text-lg font-semibold">
          Sign in
        </Button>
      </SignInButton>
    </div>
  );
};

export default SignIn;
