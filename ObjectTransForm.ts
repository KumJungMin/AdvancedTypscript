// 1. union을 object로 변환
import { Equal, Expect } from "./helpers";

type Route = "/" | "/about" | "/admin" | "/admin/users";

type RoutesObject = {
  // for in loop
  // [value in object]: value
  [K in Route]: K;
};

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": "/";
        "/about": "/about";
        "/admin": "/admin";
        "/admin/users": "/admin/users";
      }
    >
  >
];

// 2. Object value 타입 변형하기
interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

// keyof를 사용하면, 객체의 key를 union 타입으로 추출할 수 있다.
type AttributeGetters = {
  [K in keyof Attributes]: () => Attributes[K];
};

type tests2 = [
  Expect<
    Equal<
      AttributeGetters,
      {
        firstName: () => string;
        lastName: () => string;
        age: () => number;
      }
    >
  >
];
