import { Equal, Expect } from "./helpers";

// template literal types
// 특정 문자 패턴을 가지는 문자열을 표현하는 타입
type Path = `/${string}`;

export function makeUrl(path: Path) {
  return `https://my-site.com${path}`;
}

makeUrl("/user");
makeUrl("user/123");

// Extract와 Template Literal Types를 사용하면, 다음과 같이 동적인 라우팅을 구현할 수 있다.
type Routes = "/users" | "/users/:id" | "/products" | "/products/:id";

// Extract<T, U>
// T에서 U에 할당 가능한 타입을 추출한다.
type DynamicRoutes = Extract<Routes, `/${string}:id`>;

type tests = [Expect<Equal<DynamicRoutes, "/users/:id" | "/products/:id">>];

// Combination으로 Literal Types을 조합할 수 있다.
type Top = "t-shirt" | "shirts" | "jacket";

type Bottom = "jeans" | "skirt" | "slacks";

type Outfit = `${Top} with ${Bottom}`;

type tests2 = [
  Expect<
    Equal<
      Outfit,
      | "t-shirt with jeans"
      | "t-shirt with skirt"
      | "t-shirt with slacks"
      | "shirts with jeans"
      | "shirts with skirt"
      | "shirts with slacks"
      | "jacket with jeans"
      | "jacket with skirt"
      | "jacket with slacks"
    >
  >
];
