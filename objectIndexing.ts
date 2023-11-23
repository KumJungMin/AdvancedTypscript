import { Expect, Equal } from "./helpers";

// typeof와 인덱싱을 사용해, 객체의 값 타입을 추론할 수 있다.
export const fakeDataDefault = {
  foo: "foo",
  bar: 123,
  baz: true,
};

type FakeDataType = typeof fakeDataDefault;
export type FooType = FakeDataType["foo"];
export type BarType = FakeDataType["bar"];
export type BazType = FakeDataType["baz"];

type tests = [
  Expect<Equal<FooType, string>>,
  Expect<Equal<BarType, number>>,
  Expect<Equal<BazType, boolean>>
];
