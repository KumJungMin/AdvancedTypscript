// as const는, const assertions라고도 불리며, const로 선언된 객체를 불변 객체로 만들어줍니다.
// as const는 객체의 모든 프로퍼티를 readonly로 만들어줍니다.
// as const는 객체의 모든 프로퍼티를 literal type으로 만들어줍니다.

const Color = {
  Red: "Red",
  Green: "Blue",
  Blue: "Green",
} as const;

enum ColorEnum {
  Red = "Red",
  Green = "Green",
  Blue = "Blue",
}

// as const와 enum의 차이점
// as const는 객체의 프로퍼티를 literal type으로 만들어주지만,
// enum은 literal type으로 만들어주지 않는다.
// 따라서 enum은 literal type을 받는 곳에서 타입 호환성이 깨질 수 있다.

type ColorType = keyof typeof Color;

function color(c: ColorType) {
  // do something
}

function enumColor(c: ColorEnum) {
  // do something
}

color("Red");
enumColor("Red"); // 💣 error!!
