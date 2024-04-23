import { AvatarIcon } from "../avatar";
import { getUserInfo } from "@/actions/auth/action";
import { Category } from "@/types";
import Header from "./header";
import PhotoHeader from "../photo/photo-header";

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
      <div className="h-navHeight flex justify-between items-center py-4">
        <HeaderComponent />
        <AvatarIcon userInfo={userInfo} />
      </div>
    </header>
  );
}
