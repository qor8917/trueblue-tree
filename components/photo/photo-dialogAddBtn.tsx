"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import DropZone from "./drop-zone";

const DialogAddBtn = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <div className="flex gap-2 mainGradient text-white rounded-3xl h-12 px-4 self-center shadow-lg">
        {/* <CloudUpload className="w-4 h-4 self-center" /> */}
        <span className="text-base self-center">✚ Upload</span>
      </div>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <DropZone />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogAddBtn;
