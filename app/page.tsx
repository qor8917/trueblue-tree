import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="flex">
        <h1 className="text-6xl">Trueblue-tree</h1>
        <Image
          src="/trueBlueTree.webp"
          alt="trueBlueTree"
          width={60}
          height={60}
        />
      </div>

      <h1 className="text-2xl">Comming Soon</h1>
    </>
  );
}
