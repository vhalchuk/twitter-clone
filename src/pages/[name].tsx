import { useRouter } from "next/router";
import { Timeline } from "../components/timeline/Timeline";
import Head from "next/head";
import { useMemo } from "react";

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
