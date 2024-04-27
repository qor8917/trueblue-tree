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
import { redirectSignIn, redirectSignOut } from "@/actions/auth/action";
import { UserInfo } from "@/types";
import { cn } from "@/lib/utils";

export function AvatarIcon({ userInfo }: { userInfo: UserInfo }) {
  const route = useRouter();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-none">
          <Avatar
            onClick={() => {
              route.push("/api/auth/google-sign-in");
            }}
            className="shadow-lg self-center h-12 w-12"
          >
            <AvatarImage
              className={cn(userInfo && userInfo.picture ? "" : "p-2")}
              src={
                userInfo && userInfo.picture ? userInfo.picture : "/key.webp"
              }
              alt="profile"
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={16}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userInfo ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                const { status } = (await redirectSignOut()) as {
                  status: number;
                  response: object;
                };
                if (status === 200) {
                  route.push("/");
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
