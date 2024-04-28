"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
} from "@/actions/auth/actions";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/AuthProvider";
import { useEffect } from "react";

export function AvatarIcon() {
  const authContext = useAuth();
  useEffect(() => {
    const userInfoFromSever = async () => {
      const userInfo = await getUserInfo();
      authContext?.setUserInfo(userInfo);
    };
    userInfoFromSever();
  }, []);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-none">
          <Avatar className="shadow-lg self-center h-12 w-12">
            <AvatarImage
              className={cn(
                authContext &&
                  authContext?.userInfo &&
                  authContext?.userInfo.picture
                  ? ""
                  : "p-2"
              )}
              src={
                authContext &&
                authContext?.userInfo &&
                authContext?.userInfo.picture
                  ? authContext?.userInfo.picture
                  : "/key.webp"
              }
              alt="profile"
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={16} className="bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {authContext?.userInfo ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                redirectSignOut();
                authContext.setUserInfo(null);
              }}
            >
              <LogOut className="mr-2 h-4 w-4 " />
              <span>Log out</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
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
