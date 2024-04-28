import Carousel from "@/components/Carousel";

export default function ImageId({ params }: { params: { imageId: string } }) {
  const currentPhoto = {
    id: 1,
    height: "600",
    width: "600",
    public_id: "1",
    format: "avif",
  };

  return (
    <div>
      {/* <Carousel currentPhoto={currentPhoto} index={Number(params.imageId)} /> */}
    </div>
  );
}
