# Start with nodejs typescript eslint prettierrc


### Khởi tạo dự án
```js
pnpm init
```
### Thêm TypeScript như một dev dependency

```bash
pnpm add typescript -D
```

### Cài đặt kiểu dữ liệu TypeScript cho Node.js

```bash
pnpm add @types/node -D
```

### Cài đặt các package config cần thiết còn lại

```bash
pnpm add eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser ts-node tsc-alias tsconfig-paths rimraf nodemon --save-dev
```

<ul>
<li><div><code>eslint</code>: Linter (bộ kiểm tra lỗi) chính</div></li>
<li><div><code>prettier</code>: Code formatter chính</div></li>
<li><div><code>eslint-config-prettier</code>: Cấu hình ESLint để không bị xung đột với Prettier</div></li>
<li><div><code>eslint-plugin-prettier</code>: Dùng thêm một số rule prettier cho eslint</div></li>
<li><div><code>@typescript-eslint/eslint-plugin</code>: ESLint plugin cung cấp các rule cho Typescript</div></li>
<li><div><code>@typescript-eslint/parser</code>: Parser cho phép ESLint kiểm tra lỗi Typescript</div></li>
<li><div><code>ts-node</code>: Dùng để chạy TypeScript code trực tiếp mà không cần build</div></li>
<li><div><code>tsc-alias</code>: Xử lý alias khi build</div></li>
<li><div><code>tsconfig-paths</code>: Khi setting alias import trong dự án dùng <code>ts-node</code> thì chúng ta cần dùng <code>tsconfig-paths</code> để nó hiểu được <code>paths</code> và <code>baseUrl</code> trong file <code>tsconfig.json</code></div></li>
<li><div><code>rimraf</code>: Dùng để xóa folder <code>dist</code> khi trước khi build</div></li>
<li><div><code>nodemon</code>: Dùng để tự động restart server khi có sự thay đổi trong code</div></li>
</ul>

### Cấu hình file tsconfig.ts

```json
{
  "compilerOptions": {
    "module": "NodeNext", // Quy định output module được sử dụng
    "moduleResolution": "NodeNext",
    "target": "ES2022", // Target output cho code
    "outDir": "dist", // Đường dẫn output cho thư mục build
    "esModuleInterop": true,
    "strict": true /* Enable all strict type-checking options. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */,
    "baseUrl": ".", // Đường dẫn base cho các import
    "paths": {
      "~/*": ["src/*"] // Đường dẫn tương đối cho các import (alias)
    }
  },
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  },
  "files": ["src/type.d.ts"], // Các file dùng để defined global type cho dự án
  "include": ["src/**/*"] // Đường dẫn include cho các file cần build
}


```

### Cấu hình file config cho ESLint


```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "eslint-config-prettier", "prettier"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "prettier/prettier": [
      "warn",
      {
        "arrowParens": "always",
        "semi": false,
        "trailingComma": "none",
        "tabWidth": 2,
        "endOfLine": "auto",
        "useTabs": false,
        "singleQuote": true,
        "printWidth": 120,
        "jsxSingleQuote": true
      }
    ]
  }
}

```

### Cấu hình file config cho Prettier

```json
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}

```

### Config editor để chuẩn hóa cấu hình editor
- Mục đích là cấu hình các config đồng bộ các editor với nhau nếu dự án có nhiều người tham gia.

```bash
[*]
indent_size = 2
indent_style = space
```


### Cấu hình file nodemon.json


```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/index.ts"
}
```

### Cấu hình file package.json

```json
  "scripts": {
    "dev": "npx nodemon",
    "build": "rimraf ./dist && tsc && tsc-alias",
    "start": "node dist/index.js",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "prettier": "prettier --check .",
    "prettier:fix": "prettier --write ."
  }
```

### Tạo file `type.d.ts`
- Tạo file type.d.ts trong thư mục src, tạm thời bây giờ các bạn để trống cũng được. Mục đích là để defined các global type cho dự án.



