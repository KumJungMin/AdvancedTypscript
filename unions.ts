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
