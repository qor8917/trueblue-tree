import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Trueblue-tree",
  description: "Generated by Trueblue-tree",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased font-sans", mono.variable)}>
        {children}
      </body>
    </html>
  );
}
