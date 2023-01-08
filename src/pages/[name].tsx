import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { Timeline } from "../components/timeline/Timeline";

export default function UserPage() {
  const router = useRouter();

  const name = router.query.name as string;

  const where = useMemo(
    () => ({
      author: { name },
    }),
    [name]
  );

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Timeline where={where} />
    </>
  );
}
