import { Equal, Expect } from "./helpers";

// array의 인덱싱을 사용해, 값 타입을 추론할 수 있다.
const rgb = ["red", "green", "blue"] as const;

type RedAndBlue = (typeof rgb)[0 | 1];
type RGB = (typeof rgb)[number]; // number는 인덱스를 의미한다.

type tests = [
  Expect<Equal<RedAndBlue, "red" | "green">>,
  Expect<Equal<RGB, "red" | "green" | "blue">>
];
