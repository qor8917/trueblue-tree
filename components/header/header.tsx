import React from "react";
import { AvatarIcon } from "./avatar";
import { cookies } from "next/headers";

const Header: React.FC = () => {
  return (
    <header>
      <div className="h-16 flex justify-between items-center">
        <div></div>

        <AvatarIcon />
      </div>
    </header>
  );
};

export default Header;
