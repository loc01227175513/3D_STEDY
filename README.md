This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## GraphQL Codegen

Dự án này sử dụng GraphQL Code Generator để tạo các TypeScript types và React Apollo hooks từ schema GraphQL.

### Cài đặt

Để cài đặt các công cụ cần thiết, thực hiện các lệnh sau:

```bash
# Cài đặt GraphQL Code Generator CLI và các plugin
npm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/near-operation-file-preset

# Cài đặt các plugin bổ sung
npm install --save-dev @graphql-codegen/fragment-matcher @graphql-codegen/introspection @graphql-codegen/schema-ast

# Cài đặt GraphQL
npm install --save-dev graphql

# Cài đặt GQLG để tạo file GraphQL queries/mutations từ schema
npm install --save-dev gqlg prettier
```

### Các công cụ GraphQL

1. **gqlg** - Công cụ tạo các file GraphQL queries/mutations từ schema
2. **GraphQL Codegen** - Công cụ tạo TypeScript types và React Apollo hooks
3. **Scripts tự động** - Script để tạo file TypeScript types và hooks cho mỗi file GraphQL

### Cấu trúc thư mục GraphQL

```
src/graphql/
  ├── __generated__/        # Thư mục chứa schema types được tạo tự động
  │   ├── schema.ts         # TypeScript types cho schema
  │   └── types.ts          # TypeScript types tổng hợp
  ├── queries/              # Thư mục chứa các file query
  │   ├── *.gql             # File định nghĩa GraphQL query
  │   └── *.generated.tsx   # File chứa TypeScript types và hooks tương ứng
  └── mutations/            # Thư mục chứa các file mutation
      ├── *.gql             # File định nghĩa GraphQL mutation
      └── *.generated.tsx   # File chứa TypeScript types và hooks tương ứng
```

### Tạo GraphQL queries/mutations từ schema

Chạy lệnh:

```bash
npm run schema:codegen
```

Lệnh này sẽ tạo ra các file `.gql` trong thư mục `src/graphql/__generated__/queries` và `src/graphql/__generated__/mutations` dựa trên schema GraphQL.

### Tạo TypeScript types cho schema

Chạy lệnh:

```bash
npm run generate
```

Lệnh này sẽ tạo ra các file types trong thư mục `src/graphql/__generated__/` dựa trên schema GraphQL.

### Tạo TypeScript types và React Apollo hooks cho mỗi file GraphQL

Khi bạn đã tạo các file `.gql` trong thư mục `src/graphql/queries` và `src/graphql/mutations`, bạn có thể tự động tạo các file `.generated.tsx` tương ứng bằng cách chạy:

```bash
npm run generate:gql
```

Script này sẽ:
1. Quét tất cả các file `.gql` trong thư mục `src/graphql/queries` và `src/graphql/mutations`
2. Phân tích mỗi file để trích xuất thông tin về biến đầu vào (variables)
3. Tạo file `.generated.tsx` tương ứng với đúng TypeScript types và React Apollo hooks

### Cách thêm query/mutation mới

1. Tạo file `.gql` mới trong thư mục tương ứng, ví dụ: `src/graphql/queries/getProductById.gql`
2. Chạy lệnh `npm run generate:gql` để tạo file `.generated.tsx` tương ứng
3. Sau đó, bạn có thể sử dụng hooks được tạo trong các component React

### Sử dụng React Apollo hooks

```tsx
import { useGetProductsQuery } from '../graphql/queries/getProducts.generated';
import { useLoginMutation } from '../graphql/mutations/login.generated';

function MyComponent() {
  // Sử dụng query hook
  const { data, loading, error } = useGetProductsQuery();
  
  // Sử dụng mutation hook
  const [login, { data: loginData }] = useLoginMutation();
  
  const handleLogin = () => {
    login({ 
      variables: { 
        email: 'user@example.com', 
        password: 'password123' 
      } 
    });
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div>
      {data?.getProducts.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
}
```
