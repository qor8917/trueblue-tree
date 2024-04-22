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

export function AvatarIcon({ userInfo }: { userInfo: any }) {
  const route = useRouter();
  const picture = userInfo ? JSON.parse(userInfo.value).picture : null;
  console.log(picture);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-none">
          <Avatar onClick={() => route.push("/api/auth/google-sign-in")}>
            <AvatarImage
              src={picture ? picture : "http://localhost:3000/key.webp"}
              alt="profile"
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {picture ? (
            <DropdownMenuItem onClick={() => route.push("/api/auth/signout")}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => route.push("/api/auth/google-sign-in")}
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
