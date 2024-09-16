import { type NextPage } from "next";
import PageLayout from "~/components/layout";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import SignIn from "~/components/sign-in";
import Spinner from "~/components/spinner";
import Navbar from "~/components/navbar";
import CourseList from "~/components/course-list";
import Footer from "~/components/footer";
import FilterTab from "~/components/filter-tab";
import useDeviceType from "~/hooks/useDeviceType";
import TaskSection from "~/components/tasks-section";

const Home: NextPage = () => {
  const { isLoaded: userLoaded } = useUser();
  const isSmallScreen = useDeviceType();

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
          {!isSmallScreen && <CourseList />}
          <TaskSection />
          {/* <FilterTab /> */}
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
