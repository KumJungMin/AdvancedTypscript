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
