# typescript-enum

A set of missing helpers to work with TypeScript enums, providing both runtime and compile-time safety. These helpers cover both string enums and numeric enums.

### Installation

```
npm i typescript-enum
```

### Usage

1) `enumValues` - converts an enum to an iterable list:

```ts
import { enumValues } from 'typescript-enum'

enum Color { R, G, B }

console.log(enumValues(Color)) // [0, 1, 2]
```

2) `isEnumValid` - checks if a value is a member of the enum:

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

#### 1. You have a list based on enum values. 

**Before:**
❌ The following component should be updated whenever a new member is added to the enum.
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

❌ The following works only for string enums but won't work for numeric enums because the enum gets transpiled to `{"0": "Read", "1": "Write", "2": "Edit", "Read": 0, "Write": 1, "Edit": 2 }`. Notice duplicated values.

```tsx 
enum Permission { Read = 0, Write = 1, Edit = 2 }

const Component = () => {
  return <List>
    {Object.entries(Permission).map(permission => {
      // The enum values are duplicated :(
    })}
  </List>  
}
```

**After:**
✅ The following component doesn't need to be updated whenever a new member is added to the enum. It also works with both string and numeric enums.
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

#### 2. You want to make sure that an unknown value is a member of the enum.

**Before:**
❌ The following code requires an unsafe type cast.
```tsx
enum PackageType { Basic, Advanced, Premium }

const packageInput: { type: number } = { type: 0 }

function processPackage(packageType: PackageType) {
  // ...  
}

processPackage(packageInput.type as any)
```

✅ The following code validates an unknown value both at runtime and compile time.

```tsx
import { isEnumValid } from './isEnumValid'

enum Package { Basic, Advanced, Premium }

const packageInput: { type: number } = { type: 0 }

function processPackage(packageType: PackageType) {
  // ...  
}

if (!isEnumValid(packageInput.type, Package)) {
    throw new Error()
}

processPackage(packageInput.type)
```

As you can see, the type inference works correctly now, and the type cast is no longer needed. You can even go further and use an assertion library:

```tsx
import { isEnumValid } from './isEnumValid'
import { assert } from 'ts-essentials'

enum Package { Basic, Advanced, Premium }

const packageInput: { type: number } = { type: 0 }

function processPackage(packageType: PackageType) {
  // ...  
}

assert(isEnumValid(packageInput.type, Package))
processPackage(packageInput.type) // packageInput.type is inferred to Package
```
