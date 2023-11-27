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

// Object union 타입을 object로 변환하기
type Route2 =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about"; search: {} }
  | { route: "/admin"; search: {} }
  | { route: "/admin/users"; search: {} };

// Route2[search]로 하면, union 타입이 나오기 때문에 R["search"]로 해야 한다.

type RoutesObject3 = {
  // K in 타입 as K["프로퍼티"]]: K["프로퍼티"]
  [R in Route2 as R["route"]]: R["search"];
};

type tests4 = [
  Expect<
    Equal<
      RoutesObject3,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": {};
        "/admin": {};
        "/admin/users": {};
      }
    >
  >
];

// object에서 튜플 추출하기
interface Values {
  email: string;
  firstName: string;
  lastName: string;
}

// { 'email': ['email', 'string]}
type ValuesAsUnionOfTuples1 = { [K in keyof Values]: [K, Values[K]] };

type ValuesAsUnionOfTuples2 =
  ValuesAsUnionOfTuples1[keyof ValuesAsUnionOfTuples1];

type tests5 = [
  Expect<
    Equal<
      ValuesAsUnionOfTuples2,
      ["email", string] | ["firstName", string] | ["lastName", string]
    >
  >
];

// object key, value로 string union 만들기
interface FruitMap {
  apple: "red";
  banana: "yellow";
  orange: "orange";
}

type TransformedFruit1 = {
  [K in keyof FruitMap]: `${K}:${FruitMap[K]}`;
};

type TransformedFruit2 = TransformedFruit1[keyof TransformedFruit1];

type tests6 = [
  Expect<
    Equal<TransformedFruit2, "apple:red" | "banana:yellow" | "orange:orange">
  >
];
