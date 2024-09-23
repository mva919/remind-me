import { type AppType } from "next/app";
import Head from "next/head";

import { api } from "~/lib/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import CoursesContextProvider from "~/context/courses-context";
import GlobalContextProvider from "~/context/global-context";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Remind me</title>
        <meta
          name="description"
          content="Keep track of all your school tasks!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GlobalContextProvider>
        <CoursesContextProvider>
          <ThemeProvider defaultTheme="dark" enableSystem={false}>
            <Component {...pageProps} />
            <Toaster />
          </ThemeProvider>
        </CoursesContextProvider>
      </GlobalContextProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
