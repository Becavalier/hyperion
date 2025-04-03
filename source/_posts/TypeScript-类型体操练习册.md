---
title: TypeScript 类型体操练习册
intro: TypeScript 类型体操练习册
comments: true
date: 2025-04-01 17:55:00
tags:
- TypeScript
---

1. 实现一个 DeepReadonly 工具类型，它可以将一个对象类型的所有属性（包括嵌套属性）转换为只读。

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}
```

2. 实现一个 IsString 工具类型，它接受一个类型参数 T，判断 T 是否是 string 类型。

```typescript
type IsString<T> = T extends string ? true : false
```

3. 实现一个 EnumValues 工具类型，它可以从一个 enum 类型中提取出所有可能的值，并返回这些值的联合类型。

```typescript
type EnumValues<T> = T[keyof T]
```

4. 实现一个 Merge 工具类型，它可以将两个对象类型合并为一个新的对象类型。合并后的对象类型包含两个对象类型的所有属性。如果两个对象类型有同名属性，则以第二个对象类型的属性为准。

```typescript
type Merge<A, B> = {
  [P in keyof A | keyof B]: P extends keyof B ? B[P] : P extends keyof A ? A[P] : never
}
```

5. 实现一个 EnumToObject 工具类型，它可以将一个 enum 类型转换为一个对象类型，其中键是 enum 的成员名称，值是 enum 的成员值。

```typescript
type EnumToObject<T extends object> = {
  [P in keyof T]: T[P]
}

// enum Direction {
//   Up = "UP",
//   Down = "DOWN",
//   Left = "LEFT",
//   Right = "RIGHT",
// }

// Get the type of the Direction enum itself, which includes all the keys and values defined in the enum (an object type).
// type DirectionObject = EnumToObject<typeof Direction>
```

6. 实现一个 DeepMerge 工具类型，它可以递归地合并两个对象类型。如果两个对象中有同名属性且都是对象类型，则递归合并这些属性；否则，后一个对象的属性类型将覆盖前一个对象的属性类型。

```typescript
type DeepMerge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? T[K] extends object
        ? U[K] extends object
          ? DeepMerge<T[K], U[K]>
          : U[K]
        : U[K]
      : T[K]
    : K extends keyof U
    ? U[K]
    : never;
}
```

7. 实现一个 TupleToUnion 工具类型，它可以将一个元组类型转换为联合类型。

```typescript
type TupleToUnion<T> = T extends [infer First, ...infer Rest] 
  ? First | TupleToUnion<Rest> 
  : never
```

8. 实现一个 IsArray 工具类型，它接受一个类型参数 T ，并返回 true 或 false ，表示 T 是否是数组类型。

```typescript
type IsArray<T> = T extends any[] ? true : false;
```

9. 实现一个 FirstElement 工具类型，它可以从一个元组类型中提取出第一个元素的类型。如果传入的类型不是元组，则返回 never 。

```typescript
type FirstElement<T> = T extends [infer First, ...any[]] ? First : never
```

10. 实现一个 DeepFlatten 工具类型，它可以将嵌套的数组类型递归展平为单层数组类型。

```typescript
type DeepFlatten<T> = T extends (infer U)[]  // Infer every element type.
  ? U extends any[] 
    ? DeepFlatten<U> 
    : U
  : T
```

11. 实现一个 DeepPick 工具类型，它可以根据给定的路径字符串递归地从对象类型中提取出指定的属性。

```typescript
type DeepPick<T, K extends string> = K extends `${infer First}.${infer Rest}`  // Way to manipulate string.
  ? First extends keyof T
    ? { [P in First]: DeepPick<T[P], Rest> }
    : never
  : K extends keyof T
    ? { [P in K]: T[P] }
    : never
```

12. 实现一个 DeepOmit 工具类型，它可以递归地从对象类型中删除指定路径的属性。

```typescript
type DeepOmit<T, K extends string> = K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? { [P in keyof T]: P extends First ? DeepOmit<T[P], Rest> : T[P] }
    : T
  : Omit<T, K>
```

