import Image from "next/image";
import tree from "@/public/trueBlueTree.webp";
import Header from "@/components/header/header";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="h-full flex items-center justify-center gap-4 ">
        <h1 className="text-2xl">Trueblue-tree</h1>
        <div className="">
          <Image src={tree} alt="trueBlueTree" width={32} height={32} />
        </div>
      </div>
    </div>
  );
}

// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto">
//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             Welcome to your homepage
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             This is your personal space. Enjoy your time here!
//           </p>
//         </div>
//         <div className="mt-12">
//           <div className="rounded-lg shadow-md overflow-hidden">
//             <div className="flex p-6 text-lg font-medium text-gray-900 bg-white">
//               <h3>Your Account Info</h3>
//             </div>
//             <div className="p-6 bg-white">
//               <div className="flex items-center">
//                 <div className="text-sm">
//                   <p className="text-gray-900 font-medium">John Doe</p>
//                   <p className="text-gray-500">johndoe@example.com</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mt-6">
//             <Link
//               className="underline text-sm text-gray-600 hover:text-gray-500"
//               href="#"
//             >
//               Edit Profile
//             </Link>
//           </div>
//           <form action="/api/auth/signout" method="GET" className="mt-6">
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//             >
//               Sign out
//             </button>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }
