import DropZone from "@/components/drop-zone";
export default function Photo() {
  return (
    <>
      <DropZone />
    </>
  );
}

// page.ts
export function sumNumbers(numbers: number[]): number {
  // function implementation
  let sum = 0;
  for (let i = 1; i <= 100; i++) {
    sum += i;
  }
  return sum;
}
