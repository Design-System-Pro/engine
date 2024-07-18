"use client";

import { signInWithGithub } from "@/app/actions/sign-in-with-github";
import { setWriteKey } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export function SignIn() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (key) {
      // TODO: Review, For some reason, server action needs to be called with a then 🤷🏻‍♂️
      setWriteKey(key).then();
      formRef.current?.requestSubmit();
    }
  }, [key]);

  return key ? (
    <form action={signInWithGithub} ref={formRef}>
      <button type="submit">Signin with GitHub</button>
    </form>
  ) : (
    <p>Missing Key</p>
  );
}
