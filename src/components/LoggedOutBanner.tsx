import { signIn, useSession } from "next-auth/react";
import React from "react";

import { Container } from "./Container";
import { Button } from "./button/Button";

export const LoggedOutBanner: React.FC = () => {
  const { data: session } = useSession();

  if (session) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-blue-400 p-2">
        <Container className="flex justify-between gap-2 align-middle">
          <div className="text-white">
            <p className="text-xl font-semibold">Don’t miss what’s happening</p>
            <p className="text-sm">People on Twitter are the first to know.</p>
          </div>
          <Button
            variant="secondary"
            className="shrink-0 self-center"
            onClick={() => signIn()}
          >
            Log in
          </Button>
        </Container>
      </div>
      <div className="h-16" />
    </>
  );
};
