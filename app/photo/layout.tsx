import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trueblue-tree',
  description: 'Trueblue-tree photo',
};

export default function PhotoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
