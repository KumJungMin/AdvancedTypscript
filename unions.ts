// Union 타입이란?
// Union 타입은 두 개 이상의 타입을 허용하는 타입을 의미한다.
// Union 타입은 | 기호를 사용하여 정의한다.

// Discriminated Union
// 공통 필드를 가지고 있는 유니온 타입으로, 공통 필드를 이용해 타입을 좁혀나가는 방식
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

// kind라는 공통 필드를 가진 Shape 타입을 정의하고, 이를 이용해 Shape 타입을 좁혀나가는 방식
type Shape = Square | Rectangle;

function area(shape: Shape) {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// 일반적인 유니온 타입
type B = "a" | "b" | "c";

// enum 타입
// 각 멤버에 숫자 값을 매길 수 있다.(일반적으로 0부터 시작)
enum C {
  A,
  B,
  C,
}

// Extract: 유니온 타입에서 특정 타입을 추출하는 유틸리티 타입
type Shape2 =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

// 예제1. Shape2에서 kind가 "circle"와 "square"인 타입을 추출
type T2 = Extract<Shape2, { kind: "circle" } | { kind: "square" }>;
// type T2 = { kind: "circle"; radius: number } | { kind: "square"; size: number }

// 예제2. template literal types를 이용해 동적으로 타입을 추출
type Routes = "/users" | "/users/:id" | "/posts" | "/posts/:id";
type DynamicRoutes = Extract<Routes, `${string}:${string}"`>;
// type DynamicRoutes = "/users/:id" | "/posts/:id"

// template literal types: 문자열을 이용해 타입을 정의하는 방식
type Foo = "product" | "comment";
type Boo = "id";

type Baz = `${Foo}_${Boo}`;
// "product_id" | "comment_id"
