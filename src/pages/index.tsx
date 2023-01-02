import { type NextPage } from "next";
import Head from "next/head";

import { Timeline } from "../components/Timeline";
import { Container } from "../components/Container";
import { LoggedOutBanner } from "../components/LoggedOutBanner";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        component="main"
        className="h-screen border-x border-slate-50 p-2 lg:p-8"
      >
        <Timeline />
      </Container>
      <LoggedOutBanner />
    </>
  );
};

export default Home;
