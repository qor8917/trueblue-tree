"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header(prop?: any) {
  const [user, setUserInfo] = useState<any>(null);
  useEffect(() => {
    setUserInfo(prop.userInfo);
  }, [prop.userInfo]);
  return (
    <div>
      {user ? (
        <div className="text-4xl cursor-pointer">
          <Link href={"/photo"}>📸</Link>
          <Link href={"/photo2"}>🌵</Link>
        </div>
      ) : null}
    </div>
  );
}
