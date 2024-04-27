import { getUserInfo } from "@/actions/auth/action";
import { Category } from "@/types";
import Header from "./header";
import PhotoHeader from "../photo/photo-header";
import { AvatarIcon } from "../Avatar";

export default async function WrapperHeader(prop?: any) {
  const userInfo = await getUserInfo();

  const HeaderComponent = () => {
    switch (prop.category) {
      case Category.Photo:
        return <PhotoHeader userInfo={userInfo} />;
      default:
        return <Header userInfo={userInfo} />;
    }
  };

  return (
    <header>
      <div className="h-navHeight flex items-center py-4 justify-between gap-4">
        <HeaderComponent />
        <AvatarIcon userInfo={userInfo} />
      </div>
    </header>
  );
}
