import Image from "next/image";
import tree from "@/public/trueBlueTree.webp";

export default function Main() {
  return (
    <main className="h-full flex items-center justify-center gap-4 ">
      <h1 className="text-2xl">Trueblue-tree</h1>
      <div className="">
        <Image src={tree} alt="trueBlueTree" width={32} height={32} />
      </div>
    </main>
  );
}
