import WrapperHeader from "@/components/wrapper/wrapper-header";
import WrapperMain from "@/components/wrapper/warpper-main";

export default function Page({ params }: { params: { category: string } }) {
  return (
    <div className="h-full flex flex-col">
      <WrapperHeader category={params.category} />
      <WrapperMain category={params.category} />
    </div>
  );
}
