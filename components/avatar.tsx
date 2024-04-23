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
import {
  getUserInfo,
  redirectSignIn,
  redirectSignOut,
} from "@/actions/auth/action";
import { useEffect, useState } from "react";

export function AvatarIcon({ userInfo }: { userInfo: any }) {
  const route = useRouter();
  const [user, setUserInfo] = useState<any>(null);
  useEffect(() => {
    setUserInfo(userInfo);
  }, [userInfo]);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-none">
          <Avatar
            onClick={() => {
              route.push("/api/auth/google-sign-in");
            }}
          >
            {user ? (
              <>
                <AvatarImage src={user.picture} alt="profile" />
                <AvatarFallback>D</AvatarFallback>
              </>
            ) : (
              <AvatarImage src={"/key.webp"} alt="profile" />
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                const { status } = (await redirectSignOut()) as {
                  status: boolean;
                  response: object;
                };
                if (status) {
                  setUserInfo(null);
                  route.refresh();
                }
              }}
            >
              <LogOut className="mr-2 h-4 w-4 " />
              <span>Log out</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                redirectSignIn();
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
