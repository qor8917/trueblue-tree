"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserInfo } from "@/actions/auth/action";
import { useEffect, useState } from "react";

export function AvatarIcon() {
  const route = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  useEffect(() => {
    const getUser = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };
    getUser();
  }, []);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-none">
          <Avatar
            onClick={() => {
              route.push("/api/auth/google-sign-in");
            }}
          >
            {userInfo ? (
              <AvatarImage src={userInfo.picture} alt="profile" />
            ) : (
              <AvatarImage src={"/key.webp"} alt="profile" />
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userInfo ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                route.push("/api/auth/signout");
                console.log("bb");
                setUserInfo(null);
              }}
            >
              <LogOut className="mr-2 h-4 w-4 " />
              <span>Log out</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                await fetch("/api/auth/google-sign-in");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log In</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// export function AvatarIcon({ userInfo }: { userInfo: any }) {
//   const route = useRouter();
//   const picture = userInfo ? JSON.parse(userInfo.value).picture : null;
//   console.log(picture);
//   return (
//

//   );
// }
