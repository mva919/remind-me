import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import useDeviceType from "~/hooks/useDeviceType";
import useWindowDimensions from "~/hooks/useWindowDimensions";
import ThemeToggle from "~/components/theme-toggle";
import { useTheme } from "next-themes";

const Hero = () => {
  const windowDimensions = useWindowDimensions();
  const isSmallScreen = useDeviceType();
  const { theme } = useTheme();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden px-4">
      <nav className="flex items-center justify-between py-2">
        <span className="font-semibold">remind me.</span>
        <div className="flex items-center gap-x-4">
          <ThemeToggle />
          <SignInButton>
            <Button variant="outline">Log in</Button>
          </SignInButton>
        </div>
      </nav>
      <section className="relative flex grow flex-col items-center gap-y-10 text-center">
        <div className="flex flex-col items-center pt-12">
          <h1 className="mb-2 text-2xl font-semibold sm:text-3xl">
            Never Miss a Deadline Again
          </h1>
          <p>
            Let <span className="underline">remind me</span> take care of
            remembering all your due dates so you can focus on what really
            matters.
          </p>
          <SignUpButton>
            <Button className="mt-4 w-32">Get started</Button>
          </SignUpButton>
        </div>

        {theme === "dark" || theme === "system" ? (
          <Image
            alt="remind me showcase in dark mode"
            src="/showcase-dark.png"
            width={
              isSmallScreen
                ? windowDimensions.width
                : windowDimensions.width * 0.8
            }
            height={windowDimensions.height}
            className="rounded border border-slate-200 shadow-2xl dark:border-slate-600 dark:shadow-slate-600"
          />
        ) : (
          <Image
            alt="remind me showcase in light mode"
            src="/showcase-light.png"
            width={
              isSmallScreen
                ? windowDimensions.width
                : windowDimensions.width * 0.8
            }
            height={windowDimensions.height}
            className="rounded border border-slate-200 shadow-2xl dark:border-slate-600 dark:shadow-slate-600"
          />
        )}
      </section>
    </div>
  );
};

export default Hero;
