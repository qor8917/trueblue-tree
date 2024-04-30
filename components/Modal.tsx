import { motion } from "framer-motion";
import { useRef, useState } from "react";
// import type { ImageProps } from "../utils/types";
import SharedModal from "./SharedModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@radix-ui/react-dialog";

export default function Modal({ images }: { images: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageId = searchParams.get("imageId");
  let index = Number(imageId);

  const [open, setOpen] = useState(true);
  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    setOpen(false);
    router.push("/photo");
  }

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    // router.push(
    //   {
    //     query: { photoId: newVal },
    //   },
    //   `/p/${newVal}`
    // );
    router.push(`/photo?imageId=${newVal}`);
  }
  useHotkeys("ArrowLeft", () => {
    if (0 < index - 1) {
      changePhotoId(index - 1);
    }
  });
  useHotkeys("ArrowRight", () => {
    if (index < images?.length) {
      changePhotoId(index + 1);
    }
  });

  return (
    // <Dialog
    //   static
    //   open={true}
    //   onClose={handleClose}
    //   initialFocus={overlayRef}
    //   className="fixed inset-0 z-10 flex items-center justify-center"
    // >
    //   <Dialog.Overlay
    //     ref={overlayRef}
    //     as={motion.div}
    //     key="backdrop"
    //     className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //   />
    //   <SharedModal
    //     index={curIndex}
    //     direction={direction}
    //     images={images}
    //     changePhotoId={changePhotoId}
    //     closeModal={handleClose}
    //     navigation={true}
    //   />
    // </Dialog>
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogOverlay
        className="fixed inset-0 z-10 backdrop-blur-2xl "
        onClick={handleClose}
      />
      <DialogContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed z-30 w-full max-w-7xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <SharedModal
            index={curIndex}
            direction={direction}
            images={images}
            changePhotoId={changePhotoId}
            closeModal={handleClose}
            navigation={true}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
