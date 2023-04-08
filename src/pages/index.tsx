import { type NextPage } from "next";
import Link from "next/link";
import { PageLayout } from "~/components/layout";
import { UserButton, useUser } from "@clerk/nextjs";
import { SignIn } from "~/components/signin";

// import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded) return <div>Loading...</div>;

  return <PageLayout>{isSignedIn ? <UserButton /> : <SignIn />}</PageLayout>;
};

export default Home;
