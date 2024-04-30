"use client";
import { FileWithPath } from "@/types/react-dropzone";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { photoUpload } from "@/actions/photo/actions";
export default function DropZone() {
  const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    const formData = new FormData();
    // Do something with the files
    formData.append("file", acceptedFiles[0]);
    const res = await photoUpload(formData);
    console.log(res);
  }, []);
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
      "image/heic": [".heic"],
    },
  });

  // const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
  //   <li key={file.path}>
  //     {file.path} - {(file.size / 10e5).toFixed(2)} Mega bytes
  //   </li>
  // ));

  // const fileRejectionItems = fileRejections.map(
  //   ({ file, errors }: { file: FileWithPath; errors: FileError[] }) => (
  //     <li key={file.path}>
  //       {file.path} - {(file.size / 10e5).toFixed(2)} Mega bytes
  //       <ul>
  //         {errors.map((e) => (
  //           <li key={e.code}>{e.message}</li>
  //         ))}
  //       </ul>
  //     </li>
  //   )
  // );

  return (
    <>
      <div
        {...getRootProps()}
        className="border border-dashed px-8 py-16 border-teal-400 rounded-lg cursor-pointer"
      >
        <input {...getInputProps()} className="flex" />
        {isDragActive ? (
          <p>Drop the files here</p>
        ) : (
          <div className="flex flex-col gap-4 text-center">
            <UploadCloud className="self-center" />
            <p>Drag & drop to upload</p>
            <Button className="mainGradient text-white w-20 self-center">
              Select
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
