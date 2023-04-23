import { type NextPage } from "next";
import PageLayout from "~/components/layout";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import SignIn from "~/components/signin";
import Spinner from "~/components/spinner";
import Navbar from "~/components/navbar";
import CourseList from "~/components/courselist";
import Footer from "~/components/footer";
import TaskList from "~/components/tasklist";
import FilterTab from "~/components/filtertab";

const Home: NextPage = () => {
  const { isLoaded: userLoaded } = useUser();

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
        <section className="flex flex-auto">
          <CourseList />
          <TaskList />
          <FilterTab />
        </section>
        <Footer />
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
