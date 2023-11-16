"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

function Dashboard() {
  const session = useSession();
  if (session.status == "unauthenticated") {
    redirect("/");
  }

  const handleClick = () => {
    signOut();
  };
  return (
    <>
      <h1>Hello, Dashboard Page!</h1>
      <button onClick={() => signOut({ callbackUrl: "/" })}>
        Sign out
      </button>{" "}
    </>
  );
}

export default Dashboard;
