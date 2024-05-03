"use server";
import exifr from "exifr";
import { revalidatePath } from "next/cache";
import { FileWithPath } from "react-dropzone";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
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
  const outputBuffer = await sharp().toFormat("jpeg").toBuffer();

  console.log("outputBuffer", outputBuffer);
  const metadata = await exifr.parse(buffer, [
    "Model",
    "DateTimeOriginal",
    "GPSLongitude",
    "GPSLatitude",
  ]);
  const editMetadata = {
    model: metadata?.Model.toString(),
    createdtime: new Date(metadata?.DateTimeOriginal!).getTime().toString(),
    latitude: metadata?.latitude.toString(),
    longitude: metadata?.longitude.toString(),
  };

  const params = {
    Bucket: bucketName,
    Key: `original/${file.name}`,
    Body: buffer,
    ContentType: file.type,
    Metadata: editMetadata,
  };
  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);

    console.log("File uploaded successfully:", response);

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
    await uploadFileToS3(file);

    // await listPhotos();
    revalidatePath("/");
    return { status: "success", message: "File has been upload." };
  } catch (error) {
    return { status: "error", message: "Failed to upload file." };
  }
};
export const listPhotos = async () => {
  try {
    const params = {
      Bucket: bucketName,
    };

    const response = await s3Client.send(new ListObjectsV2Command(params));

    const photos = response.Contents?.map((photo) => photo.Key);

    console.log("list", photos);
    const params2 = {
      Bucket: bucketName,
      Key: photos![0],
    };
    const metadata = await s3Client.send(new HeadObjectCommand(params2));
    console.log("metadata222", metadata);
    return photos;
  } catch (error) {
    return [];
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
