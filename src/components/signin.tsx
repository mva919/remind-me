import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Button from "./button";

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-8">
      <div className="flex flex-wrap items-center justify-center gap-10 space-y-10 md:flex-row-reverse">
        <div>
          <div className="max-w-lg space-y-4">
            <div className="flex flex-col gap-2 md:flex-row">
              <span className="text-4xl">👋</span>
              <h1 className="text-2xl font-bold dark:text-slate-100 md:text-4xl">
                Welcome to Remind me!
              </h1>
            </div>
            <p className="text-lg dark:text-slate-100">
              The tool for all of your school task tracking needs. Please sign
              in to start keeping track of all your school tasks!
            </p>
          </div>

          <div className="mt-4">
            <SignInButton>
              <Button
                variant="primary"
                className="px-16 py-2 text-lg font-semibold"
              >
                Sign in
              </Button>
            </SignInButton>
          </div>
        </div>
        <Image
          priority
          src="/welcome_illustration.svg"
          height={500}
          width={500}
          alt="Welcome Illustration"
        />
      </div>
    </div>
  );
};

export default SignIn;
