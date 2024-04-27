"use client";
import { CloudUpload } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DialogAddBtn from "./photo-dialogAddBtn";
import { UserInfo } from "@/types";

export default function PhotoHeader({ userInfo }: { userInfo: UserInfo }) {
  return (
    <>
      {userInfo ? (
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
      ) : (
        <div></div>
      )}
    </>
  );
}
