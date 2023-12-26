import {Equal, Expect} from "./helpers";

// Generic type constraint?
// 타입스크립트의 타입변수(T)에 아무 타입이나 넘길 수 있기 때문에 문제가 발생한다.
// 객체의 경우 키값이, string, symbol, number가 될 수 있기 때문에 제네릭 선언시 타입을 제한해야한다.
const obj = {};

const shouldBeRecordType = <T>(t: T) => obj[t] // Error!
const shouldBeRecordTypeSolution = <T extends string>(t: T) => obj[t];

shouldBeRecordTypeSolution("hello")
shouldBeRecordTypeSolution(2) // Error!



// extends는 타입변수의 타입을 제한하는 역할을 한다.
// 제네릭의 extends는 인터페이스나 클래스의 extends 와 약간 정의가 다르다.
// 클래스의 extends는 상속의 의미로서 '확장' 의 정의를 가지지만, 
// 제네릭의 extends는 '제한' 의 의미를 가진다는 차이점이 있다.
export const returnWhatIPassIn = <T extends string>(t: T) => t;
const a = returnWhatIPassIn("a");

type test1 = Expect<Equal<typeof a, "a">>;

returnWhatIPassIn(1);

returnWhatIPassIn(true);

returnWhatIPassIn({
    foo: "bar",
});
