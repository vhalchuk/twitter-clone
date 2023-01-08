import { useRouter } from "next/router";
import { Timeline } from "../components/timeline/Timeline";
import Head from "next/head";

export default function UserPage() {
  const router = useRouter();

  const name = router.query.name as string;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Timeline
        where={{
          author: {
            name,
          },
        }}
      />
    </>
  );
}
