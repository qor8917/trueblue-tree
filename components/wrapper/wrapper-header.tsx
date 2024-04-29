import { Category } from "@/types";
import Header from "./header";
import PhotoHeader from "../photo/photo-header";
import { AvatarIcon } from "../AvatarIcon";

export default async function WrapperHeader(prop?: any) {
  const HeaderComponent = () => {
    switch (prop.category) {
      case Category.Photo:
        return <PhotoHeader />;
      default:
        return <Header />;
    }
  };

  return (
    <header>
      <div className="h-navHeight flex items-center py-4 justify-between gap-4">
        <HeaderComponent />
        <AvatarIcon />
      </div>
    </header>
  );
}
