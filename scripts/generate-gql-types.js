const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Thư mục chứa GraphQL mutations và queries
const GRAPHQL_DIRS = [
  path.join(__dirname, '../src/graphql/mutations'),
  path.join(__dirname, '../src/graphql/queries'),
];

// Template cho file .generated.tsx
const generateMutationTemplate = (fileName, queryName, isQuery = false, variables = [], returnType = 'any') => {
  const operationType = isQuery ? 'Query' : 'Mutation';
  const hookType = isQuery ? 'Query' : 'Mutation';
  const useHookName = isQuery ? `use${queryName}Query` : `use${queryName}Mutation`;
  
  let variablesType = '{ [key: string]: never }';
  if (variables.length > 0) {
    variablesType = `{\n${variables.map(v => `  ${v.name}: ${v.type};`).join('\n')}\n}`;
  }
  
  return `import * as Types from '../__generated__/schema';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type ${queryName}${operationType}Variables = Types.Exact<${variablesType}>;

export type ${queryName}${operationType} = ${returnType};

export const ${queryName}Document = gql\`
  // GraphQL document sẽ được replace sau
\`;

export function ${useHookName}(
  baseOptions?: Apollo.${hookType}HookOptions<
    ${queryName}${operationType},
    ${queryName}${operationType}Variables
  >
) {
  const options = { ...baseOptions };
  return Apollo.use${hookType}<${queryName}${operationType}, ${queryName}${operationType}Variables>(
    ${queryName}Document,
    options
  );
}
`;
};

// Phân tích file GraphQL để lấy thông tin biến
const parseGraphQLVariables = (content) => {
  const variables = [];
  const variableRegex = /\$(\w+):\s*([^!,\s)]+)(!)?/g;
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const name = match[1];
    let type = match[2];
    const required = !!match[3];
    
    if (type.includes('Input')) {
      type = `Types.${type}`;
    } else if (type === 'String') {
      type = "Types.Scalars['String']['input']";
    } else if (type === 'Int') {
      type = "Types.Scalars['Int']['input']";
    } else if (type === 'Float') {
      type = "Types.Scalars['Float']['input']";
    } else if (type === 'Boolean') {
      type = "Types.Scalars['Boolean']['input']";
    } else if (type === 'ID') {
      type = "Types.Scalars['ID']['input']";
    }
    
    variables.push({
      name,
      type: required ? type : `Types.InputMaybe<${type}>`,
    });
  }
  
  return variables;
};

// Phân tích file GraphQL để lấy thông tin kiểu trả về
const parseGraphQLReturnType = (content, isQuery, queryName) => {
  // Đây là một giải pháp đơn giản, thực tế bạn cần phân tích cú pháp phức tạp hơn
  // để xác định chính xác kiểu trả về
  const returnType = isQuery 
    ? `{ __typename?: 'Query' } & { /* TODO: Điền kiểu trả về chính xác */ }`
    : `{ __typename?: 'Mutation' } & { /* TODO: Điền kiểu trả về chính xác */ }`;
    
  return returnType;
};

// Tạo file .generated.tsx cho mỗi file .gql
const generateTypesForGraphQLFiles = (dirPath) => {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    if (file.endsWith('.gql')) {
      const filePath = path.join(dirPath, file);
      const fileName = path.basename(file, '.gql');
      const generatedFileName = `${fileName}.generated.tsx`;
      const generatedFilePath = path.join(dirPath, generatedFileName);
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Xác định loại operation (query hoặc mutation)
      const isQuery = fileContent.trim().startsWith('query');
      
      // Xử lý tên operation
      let queryName = fileName;
      if (queryName.startsWith('get')) {
        queryName = queryName.charAt(0).toUpperCase() + queryName.slice(1);
      } else {
        queryName = queryName.charAt(0).toUpperCase() + queryName.slice(1);
      }
      
      // Phân tích biến và kiểu trả về
      const variables = parseGraphQLVariables(fileContent);
      const returnType = parseGraphQLReturnType(fileContent, isQuery, queryName);
      
      // Tạo file .generated.tsx
      const templateContent = generateMutationTemplate(fileName, queryName, isQuery, variables, returnType);
      
      // Thay thế phần GraphQL document
      const generatedContent = templateContent.replace(
        '  // GraphQL document sẽ được replace sau',
        fileContent.trim()
      );
      
      // Ghi file
      fs.writeFileSync(generatedFilePath, generatedContent);
      console.log(`Đã tạo file ${generatedFileName}`);
    }
  });
};

// Chạy script
GRAPHQL_DIRS.forEach(dir => {
  console.log(`Đang xử lý thư mục: ${dir}`);
  generateTypesForGraphQLFiles(dir);
});

console.log('Đã hoàn thành tạo các file .generated.tsx'); 