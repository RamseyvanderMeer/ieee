import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { PageLayout } from "~/components/layout";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import Head from "next/head";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <SessionProvider session={session}>
      <Head>
        <title>IEEE UIUC</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          name="description"
          content="IEEE UIUC Branch Website - get upto date information of the latest tech talks, info sessions, luncheons, workshops, and socials. Or reach up though the contact form!"
        />
        <meta
          name="keywords"
          content="IEEE, UIUC, Electrical, Engineering, Coputer, Tech, CS, ECE, EE, CE, Code, TAG, Wires, Grainer, College"
        />
        <meta name="author" content="Ramsey van der Meer" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#000000" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="robots" content="index, follow" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="canonical" href="https://ieee.illinois.edu"></link>
        <meta name="msapplication-TileColor" content="#da532c" />
        {/* <meta
          property="og:image"
          content="https://ramseyvdm.com/images/og-image.png"
        /> */}
      </Head>
      <Toaster position="bottom-center" />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
      <Analytics />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
