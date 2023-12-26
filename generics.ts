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



// ---------------------------------------------------------
// 3. 여러 인자를 가진 제네릭
// 여러 개의 인자 타입을 컨트롤해야하는 경우, <T1, T2, ...> 형식으로 선언하면 된다. 
const returnBothOfWhatIPassIn = <T1, T2>(params: { a: T1; b: T2 }) => {
    return {
        first: params.a,
        second: params.b,
    };
};
const result2 = returnBothOfWhatIPassIn({ a: "a", b: 1});
type test1 = Expect<
    Equal<
        typeof result2,
        {
            first: string;
            second: number;
        }
    >
>;


// ---------------------------------------------------------
// 3. 타입을 제네릭으로 선언하는 방법

type CreateDataShape <T1, T2> = {
    data: T1;
    error: T2;
};

type tests3 = [
    Expect<
        Equal<
            CreateDataShape<string, TypeError>,
            {
                data: string;
                error: TypeError;
            } 
        >
    >,
    Expect<
        Equal<
            CreateDataShape<number, Error>,
            {
                data: number;
                error: Error;
            }
        >
    >,
    Expect<
        Equal<
            CreateDataShape<boolean, SyntaxError>,
            {
                data: boolean;
                error: SyntaxError;
            }
        >
    >,
];


// ---------------------------------------------------------
// 4. 제네릭 타입에 기본값을 넘기면, 타입을 넘기지 않아도 기본값으로 타입이 정의된다.

type CreateDataShape3<TData, TError = undefined> = {
    data: TData;
    error: TError;
};

type tests4 = [
    Expect<
        Equal<
            CreateDataShape3<string>,
            {
                data: string;
                error: undefined;
            }
        >
    >,
    Expect<
        Equal<
            CreateDataShape3<boolean, SyntaxError>,
            {
                data: boolean;
                error: SyntaxError;
            }
        >
    >,
];


// ---------------------------------------------------------
// 5. 제네릭 클래스 만드는 법
// 클래스명 뒤에 <T>를 붙여서 제네릭 클래스를 만들 수 있다.

export class Component<T> {
    private props: T;

    constructor(props: T) {
        this.props = props;
    }
    getProps = () => this.props;
}

// ---------------------------------------------------------
// spread 연산자를 사용하면, 제네릭 타입을 확장할 수 있다.
// T는 함수의 인자와 리턴 타입을 가지는 제네릭 타입
// Parameters<T>는 함수의 인자 타입을 가지는 제네릭 타입
// ReturnType<T>는 함수의 리턴 타입을 가지는 제네릭 타입

type GetParametersAndReturnType<T extends (...args) => any > = {
    params: Parameters<T>; // 함수의 인자 타입을 가짐
    returnValue: ReturnType<T>; // 함수의 리턴 타입을 가짐
};

type tests5 = [
    Expect<
        Equal<
            GetParametersAndReturnType<() => string>,
            { params: []; returnValue: string }
        >
    >,
    Expect<
        Equal<
            GetParametersAndReturnType<(s: string) => void>,
            { params: [string]; returnValue: void }
        >
    >,
    Expect<
        Equal<
            GetParametersAndReturnType<(n: number, b: boolean) => number>,
            { params: [number, boolean]; returnValue: number }
        >
    >,
];


// ---------------------------------------------------------
// 빈 객체를 제네릭으로 넘기면, 타입이 null, undefined를 가지지 못하도록 설정가능하다.
export type Maybe<T extends {}> = unknown;

type tests6 = [
    Maybe<null>, // error
    Maybe<undefined>, // error

    Maybe<string>,
    Maybe<false>,
    Maybe<0>,
    Maybe<"">,
];
