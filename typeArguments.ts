import { expect, it } from "vitest";
import {Equal, Expect} from "./helpers";

const typedObjectKeys = <TKey extends string>(obj: Record<TKey, any>) => {
  // as를 사용해 TKey타입을 가진 배열로 변환
    return Object.keys(obj) as Array<TKey>;
};

const result1 = typedObjectKeys({
    a: 1,
    b: 2,
});

expect(result1).toEqual(["a", "b"]);

type test = Expect<Equal<typeof result1, Array<"a" | "b">>>;
