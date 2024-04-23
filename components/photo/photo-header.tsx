"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PhotoHeader({ userInfo }: { userInfo: any }) {
  const [user, setUserInfo] = useState<any>(null);
  useEffect(() => {
    setUserInfo(userInfo);
  }, [userInfo]);
  return (
    <div>
      {user ? (
        <div className="text-4xl cursor-pointer flex gap-4">
          <div>
            <Link href={"/photo"}>📷</Link>
          </div>
          <div className="w-12 h-12 maingradient">✚</div>
        </div>
      ) : null}
    </div>
  );
}
