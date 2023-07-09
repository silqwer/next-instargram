"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorButton from "./ui/buttons/ColorButton";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <section className="flex justify-center mt-[30%]">
      {Object.values(providers).map(({ id, name }) => (
        <ColorButton
          key={id}
          text={`Sign in with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
          size="big"
        />
      ))}
    </section>
  );
}
