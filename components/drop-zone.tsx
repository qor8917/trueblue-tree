'use client';
import { FileError, FileWithPath } from '@/types/react-dropzone';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
export default function DropZone() {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // Do something with the files
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
      'image/png': ['.png', '.jpg', '.jpeg'],
      'image/heic': ['.heic'],
    },
  });

  const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {(file.size / 10e5).toFixed(2)} Mega bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: { file: FileWithPath; errors: FileError[] }) => (
      <li key={file.path}>
        {file.path} - {(file.size / 10e5).toFixed(2)} Mega bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    )
  );

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
      </div>
      <div className="p-8">
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </div>
    </>
  );
}
