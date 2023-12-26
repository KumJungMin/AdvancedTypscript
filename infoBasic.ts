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


// ----------------------------------------------

interface MyComplexInterface<Event, Context, Name, Point> {
    getEvent: () => Event;
    getContext: () => Context;
    getName: () => Name;
    getPoint: () => Point;
}

type Example = MyComplexInterface<
    "click",
    "window",
    "my-event",
    { x: 12; y: 14 }
>;
// MyComplexInterface의 타입을 꺼내서 사용할 수 있도록 하는 타입을 만들수 있음
type GetPoint<T> = T extends MyComplexInterface<any, any, any, infer U> ? U : never;

type tests = [Expect<Equal<GetPoint<Example>, { x: 12; y: 14 }>>];
