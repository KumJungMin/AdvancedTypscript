import {Equal, Expect} from "./helpers";
// infer은 타입스크립트가 타입을 추론할 수 있도록 도와주는 키워드이다.
// infer를 사용하면 특정 데이터 객체의 값을 타입으로 추론할 수 있다.

type GetDataValue<T> = T extends {data: infer U} ? U : never;

type tests = [
    Expect<Equal<GetDataValue<{ data: "hello" }>, "hello">>,
    Expect<Equal<GetDataValue<{ data: { name: "hello" } }>, { name: "hello" }>>,
    Expect<
        Equal<
            GetDataValue<{ data: { name: "hello"; age: 20 } }>,
            { name: "hello"; age: 20 }
        >
    >,
    // Expect that if you pass in string, it
    // should return never
    Expect<Equal<GetDataValue<string>, never>>,
];
