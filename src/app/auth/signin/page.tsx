import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignIn from "@/components/SignIn";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signup or Login to Instagram",
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SignInPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const { callbackUrl } = searchParams;

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return <SignIn providers={providers} callbackUrl={callbackUrl ?? "/"} />;
}
