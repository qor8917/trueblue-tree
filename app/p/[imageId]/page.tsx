import Carousel from "@/components/Carousel";

export default function ImageId({ params }: { params: { imageId: string } }) {
  return (
    <div>
      <Carousel currentPhoto={currentPhoto} index={Number(params.imageId)} />
    </div>
  );
}
