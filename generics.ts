import {Equal, Expect} from "./helpers";
// 제네릭이란?
// 인자로 타입을 받아서 유동적인 타입을 만들수 있음

// 1. genericsFunc는 인자를 타입으로 받음
const genericsFunc = <T>(arg: T) => arg;
const result = genericsFunc<number>(1);

// 2. returnWhatIPassIn는 인자를 타입으로 받아서 인자를 그대로 리턴함
const returnWhatIPassIn = <T>(t: T) => {
  return t;
}

// 타입이 number가 아닌 1로 추론되는 이유는 리터럴 타입 추론이 일어나기 때문
// 그 이유는 타입스크립트가 타입을 추론할때 리터럴 타입을 우선적으로 추론하기 때문
const one = returnWhatIPassIn(1); 
const matt = returnWhatIPassIn("matt"); 
const oneNumber = returnWhatIPassIn<number>(1); 
const oneString = returnWhatIPassIn<string>("matt"); 

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];
type tests2 = [Expect<Equal<typeof oneNumber, number>>, Expect<Equal<typeof oneString, string>>];
