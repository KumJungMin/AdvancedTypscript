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

interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

type AttributeGetters2 = {
  // Capitalize<T>: T의 첫 글자를 대문자로 변환한다.
  // [K in keyof Type as `변형한 키 형태`]

  [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K];
};

type tests3 = [
  Expect<
    Equal<
      AttributeGetters2,
      {
        getFirstName: () => string;
        getLastName: () => string;
        getAge: () => number;
      }
    >
  >
];
