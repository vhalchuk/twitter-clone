import { type NextPage } from "next";
import Head from "next/head";

import { Timeline } from "../components/timeline/Timeline";
import { CreateTweet } from "../components/create-tweet/CreateTweet";
import React from "react";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session && <CreateTweet />}
      <Timeline />
    </>
  );
};

export default Home;
