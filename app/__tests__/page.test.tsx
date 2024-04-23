// page.test.ts
import { sumNumbers } from "../[category]/page";

test("sumNumbers should return 5050 for numbers from 1 to 100", () => {
  expect(sumNumbers(Array.from({ length: 100 }, (_, i) => i + 1))).toBe(5050);
});
