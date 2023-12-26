// 타입스페이스에서 조건 타입 사용하기
// T extends U ? X : Y
type IsString<T> = T extends string ? true : false;
type greeting<T> = T extends "hello" ? "world" : "bye";