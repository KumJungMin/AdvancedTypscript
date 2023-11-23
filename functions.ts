// 1. 함수 리턴 타입, 파라미터, awaited의 활용

// 1-1. 함수 리턴 타입 추론
const myFunc = () => {
  return "hello";
};

// ReturnType을 사용하면 함수의 리턴 타입을 추론할 수 있다.
// 이때, typeof를 사용해, 함수의 타입을 가져온다.
type MyFuncReturn = ReturnType<typeof myFunc>;

// 1-2. 함수의 파리미터 타입 추론
function func(
  foo: string,
  obj: {
    bar: number;
    baz: boolean;
  }
) {}

// Parameters를 사용하면 함수의 파라미터 타입을 추론할 수 있다.
// 이때 타입은 튜플 형태로 추론된다.
// 튜플은 배열과 비슷하지만, 타입과 길이가 고정된 배열이다.
type FuncParams = Parameters<typeof func>;

// 1-3. awaited의 활용
const getUser = () => {
  return Promise.resolve({
    name: "mike",
    age: 23,
  });
};

// Awaited를 사용하면 Promise의 리턴 타입을 추론할 수 있다.
type User = Awaited<ReturnType<typeof getUser>>;
