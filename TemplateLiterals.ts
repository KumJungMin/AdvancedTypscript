// template literal types
// 특정 문자 패턴을 가지는 문자열을 표현하는 타입
type Path = `/${string}`;

export function makeUrl(path: Path) {
  return `https://my-site.com${path}`;
}

makeUrl("/user");
makeUrl("user/123");
