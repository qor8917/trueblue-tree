"use server";
import exifr from "exifr";
import { revalidatePath } from "next/cache";
import { FileWithPath } from "react-dropzone";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

const bucketName = process.env.AWS_BUCKET_NAME as string;
const region = process.env.AWS_BUCKET_REGION as string;
const accessKeyId = process.env.AWS_ACCESS_KEY as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function uploadFileToS3(file: FileWithPath) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const metadata = await exifr.parse(buffer);
  console.log(metadata);
  const params = {
    Bucket: bucketName,
    Key: `origin_${file.name}`,
    Body: buffer,
    ContentType: file.type,
    // metadata: {},
  };
  const command = new PutObjectCommand(params);

  try {
    const response = await s3Client.send(command);

    // console.log("File uploaded successfully:", response);

    return file.name;
  } catch (error) {
    throw error;
  }
}

export const photoUpload = async (formData: FormData) => {
  try {
    const file = formData.get("file") as FileWithPath;

    if (file.size === 0) {
      return { status: "error", message: "Please select a file." };
    }
    // const buffer = Buffer.from(await file.arrayBuffer());
    await uploadFileToS3(file);

    revalidatePath("/");
    return { status: "success", message: "File has been upload." };
  } catch (error) {
    return { status: "error", message: "Failed to upload file." };
  }
};

export const deletePhoto = async (key: string) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    const response = await s3Client.send(new DeleteObjectCommand(params));

    console.log("File deleted successfully:", response);

    revalidatePath("/");
    return { status: "success", message: "File has been deleted." };
  } catch (error) {
    return { status: "error", message: "Failed to delete file." };
  }
};

export const getPhotoMetadata = async (key: string) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    const response = await s3Client.send(new HeadObjectCommand(params));

    return response.Metadata;
  } catch (error) {
    return {};
  }
};