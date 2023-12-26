import {Equal, Expect} from "./helpers";

// 타입스페이스에서 조건 타입 사용하기
// T extends U ? X : Y
type IsString<T> = T extends string ? true : false;
type greeting<T> = T extends "hello" ? "world" : "bye";



type YouSayGoodbyeAndISayHello<T> = T extends "hello" | "goodbye" ? 
T extends "hello" ? "goodbye" : "hello"
: never;

type tests = [
    Expect<Equal<YouSayGoodbyeAndISayHello<"hello">, "goodbye">>,
    Expect<Equal<YouSayGoodbyeAndISayHello<"goodbye">, "hello">>,
    Expect<Equal<YouSayGoodbyeAndISayHello<"alright pal">, never>>,
    Expect<Equal<YouSayGoodbyeAndISayHello<1>, never>>,
];

// ----------------------------------------------
// 조건 타입으로 object 키 타입 선언하기
interface Example {
    name: string;
    age: number;
    id: string;
    organisationId: string;
    groupId: string;
}

type OnlyIdKeys<T> = {
    [K in keyof T as K extends `${string}${"id"|"Id"}` ? K : never]: T[K]
}

type tests2 = [
    Expect<
        Equal<
            OnlyIdKeys<Example>,
            {
                id: string;
                organisationId: string;
                groupId: string;
            }
        >
    >,
    Expect<Equal<OnlyIdKeys<{}>, {}>>
];

