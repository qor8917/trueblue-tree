"use client";
import { UserInfo } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({ userInfo }: { userInfo: UserInfo }) {
  return (
    <>
      {userInfo ? (
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
