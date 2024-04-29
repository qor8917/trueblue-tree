"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import Modal from "../Modal";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../Modal";

export default function PhotoMain() {
  const [images, setImage] = useState<unknown[]>([]);
  const searchParams = useSearchParams();
  const imageId = searchParams.get("imageId");

  useEffect(() => {
    setImage(() => [
      { id: "1", name: "test4", src: "http://localhost:3000/images/1.avif" },
      { id: "2", name: "test4", src: "http://localhost:3000/images/2.avif" },
      { id: "3", name: "test4", src: "http://localhost:3000/images/3.avif" },
    ]);
  }, []);
  return (
    <>
      {imageId && <Modal images={images} />}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        {images.map((image: any, index) => {
          return (
            <Link
              key={image.id}
              // href={`/p/${image.id}`}
              href={`/photo?imageId=${image.id}`}
              className="group relative mb-5 block cursor-zoom-in"
            >
              <Image
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 group-hover:shadow-xl"
                src={image.src}
                alt={image.name}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                (max-width: 1280px) 50vw,
                (max-width: 1536px) 33vw,
                25vw"
                style={{ transform: "translate3d(0, 0, 0)" }}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
