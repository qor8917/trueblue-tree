"use client";
import Link from "next/link";
import DialogAddBtn from "./photo-dialogAddBtn";
import { useAuth } from "@/hooks/AuthProvider";

export default function PhotoHeader() {
  const authContext = useAuth();

  if (!authContext?.userInfo) {
    return;
  }

  return (
    <>
      <div className="text-4xl cursor-pointer flex gap-4 grow justify-between">
        <div className="self-center">
          <Link href={"/photo"} className="flex">
            <span className="self-center pb-1">📸</span>
          </Link>
        </div>
        <div className="flex">
          <DialogAddBtn />
        </div>
      </div>
    </>
  );
}
