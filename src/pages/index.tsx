import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

import { CreateTweet } from "../components/create-tweet/CreateTweet";
import { Timeline } from "../components/timeline/Timeline";

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
