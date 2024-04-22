import React from "react";
import { AvatarIcon } from "./avatar";
import { cookies } from "next/headers";

const Header: React.FC = () => {
  const cookieStore = cookies();
  const userInfo = cookieStore.get("user_info");
  return (
    <header className="h-16 py-8 outline-none ">
      <div className="flex justify-between">
        <div></div>
        <div>
          <AvatarIcon userInfo={userInfo} />
        </div>
      </div>
    </header>
  );
};

export default Header;
