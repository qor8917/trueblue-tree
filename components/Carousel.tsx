"use client";
import Image from "next/image";
import SharedModal from "./SharedModal";
import { useRouter } from "next/navigation";

export default function Carousel({
  index,
  currentPhoto,
}: {
  index: number;
  currentPhoto: any;
}) {
  const router = useRouter();

  function closeModal() {
    router.push("/photo");
  }

  function changePhotoId(newVal: number) {
    return newVal;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
        onClick={closeModal}
      >
        <div className="h-full bg-red-500"></div>
        {/* <Image
          src={currentPhoto.blurDataUrl}
          className="pointer-events-none h-full w-full"
          alt="blurred background"
          fill
          priority={true}
        /> */}
      </button>
      <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  );
}
