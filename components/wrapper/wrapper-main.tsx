import Main from "./main";
import PhotoMain from "../photo/photo-main";
import { Category } from "@/types";

export default function WrapperMain(prop?: any) {
  const MainComnent = () => {
    switch (prop.category) {
      case Category.Photo:
        return <PhotoMain />;
      default:
        return <Main />;
    }
  };
  return (
    <main className="h-full">
      <MainComnent />
    </main>
  );
}
