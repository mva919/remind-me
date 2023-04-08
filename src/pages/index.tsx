import { type NextPage } from "next";
import Link from "next/link";
import { PageLayout } from "~/components/layout";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { SignIn } from "~/components/signin";
import Spinner from "~/components/spinner";
import Navbar from "~/components/navbar";

// import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded)
    return (
      <PageLayout>
        <div className="flex h-full items-center justify-center">
          <Spinner size={128} />
        </div>
      </PageLayout>
    );

  return (
    <PageLayout>
      <SignedIn>
        <Navbar />
      </SignedIn>

      <SignedOut>
        <div className="flex h-full items-center justify-center">
          <SignIn />
        </div>
      </SignedOut>
    </PageLayout>
  );
};

export default Home;
