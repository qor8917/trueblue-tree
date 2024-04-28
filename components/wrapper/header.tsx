"use client";
import { useAuth } from "@/hooks/AuthProvider";
import Link from "next/link";

export default function Header() {
  const authContext = useAuth();

  return (
    <>
      {authContext?.userInfo ? (
        <div className="text-4xl cursor-pointer grow">
          <Link href={"/photo"}>📸</Link>
          <Link href={"/photo2"}>🌵</Link>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
