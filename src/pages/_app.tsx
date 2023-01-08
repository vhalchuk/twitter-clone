import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { Container } from "../components/Container";
import { LoggedOutBanner } from "../components/LoggedOutBanner";
import "../styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Container
        component="main"
        className="h-min-screen h-full border-x border-gray-100"
      >
        <Component {...pageProps} />
        <LoggedOutBanner />
      </Container>
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
