import { type NextPage } from "next";
import Head from "next/head";

import { Timeline } from "../components/timeline/Timeline";
import { Container } from "../components/Container";
import { LoggedOutBanner } from "../components/LoggedOutBanner";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container component="main" className="h-screen border-x border-gray-100">
        <Timeline />
        {!session && <LoggedOutBanner />}
      </Container>
    </>
  );
};

export default Home;
