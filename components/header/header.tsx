import React from "react";
import { AvatarIcon } from "./avatar";
import Menu from "./menu";

const Header: React.FC = () => {
  return (
    <header>
      <div className="h-16 flex justify-between items-center">
        <Menu />
        <AvatarIcon />
      </div>
    </header>
  );
};

export default Header;
