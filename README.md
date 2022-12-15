# typescript-enum

A set of missing helpers to work with TypeScript enums with runtime and compile time safety. These helpers cover both string enums and numeric enums.

### Installation

```
npm i typescript-enum
```

### Usage

1) `enumValues` - converts an enum to iterable list:

```ts
import { enumValues } from 'typescript-enum'

enum Color { R, G, B }

console.log(enumValues(Color)) // [0, 1, 2]
```

2) `isEnumValid` - checks if value is a member of enum

```ts
import { enumValues } from 'typescript-enum'

enum Color { R, G, B }

const maybeColor = 0;
const notColor = 999;
console.log(isEnumValid(maybeColor, Color)); // true
console.log(isEnumValid(notColor, Color)); // false

if (isEnumValid(maybeColor)) {
  // now the type of maybeColor is inferred to Color
}

```

### Use cases

#### 1. You have a list based on enum value. 

❌ The following component should be updated whenever new member is added to enum
```tsx 
enum Permission { Read = 0, Write = 1, Edit = 2 }

const Component = () => {
  return <List>
    {[Permission.Read, Permission.Write, Permission.Edit].map(permission => {
      // Render checkbox to edit permission
    })}
  </List>  
}
```

❌ The following works only for string enums but won't work for numeric enums, because the enum gets transpiled to `{"0": "Read", "1": "Write", "2": "Edit", "Read": 0, "Write": 1, "Edit": 2 }`
```tsx 
enum Permission { Read = 0, Write = 1, Edit = 2 }

const Component = () => {
  return <List>
    {(Object.entries(Permission)).map(permission => {
      // The enum values are duplicated :(
    })}
  </List>  
}
```

✅ The following component doesn't need to be updated whenever new member is added to enum. Also it works with both string and numeric enums.
```tsx 
import { enumValues } from 'typescript-enum'

enum Permission { Read = 0, Write = 1, Edit = 2 }

const Component = () => {
  return <List>
    {enumValues(Permission).map(permission => {
      // Render checkbox to edit permission
    })}
  </List>  
}
```

#### 2. You want to make sure that unknown value is member of enum 

❌ The following code requires hacky ways to check whether value is member of enum
```tsx
enum PackageType { Basic, Advanced, Premium }

const packageInput: { type: number } = { type: 0 }

function processPackage(packageType: PackageType) {
  // ...  
}

processPackage(packageInput.type as any)
```

✅ The following code validates unknown value both runtime and compile type

```tsx
import { isEnumValid } from './isEnumValid'

enum Package { Basic, Advanced, Premium }

const packageInput: { type: number } = { type: 0 }

function processPackage(packageType: PackageType) {
  // ...  
}

if (!isEnumValid(packageInput.type)) {
    throw new Error()
}

processPackage(packageInput.type)
```

As you see the type inference works correctly now, the type cast is no longer needed. You can even go further and use an assertion library:

```tsx
import { isEnumValid } from './isEnumValid'
import { assert } from 'ts-essentials'

enum Package { Basic, Advanced, Premium }

const packageInput: { type: number } = { type: 0 }

function processPackage(packageType: PackageType) {
  // ...  
}

assert(isEnumValid(packageInput.type))
processPackage(packageInput.type)
```
