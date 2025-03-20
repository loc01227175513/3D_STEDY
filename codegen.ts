import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://64.23.206.54:3000/graphql', // URL của GraphQL API
  documents: ['src/graphql/mutations/*.gql', 'src/graphql/queries/*.gql'],
  ignoreNoDocuments: true,
  generates: {
    'src/graphql/__generated__/schema.ts': {
      plugins: ['typescript'],
    },
    'src/graphql/mutations/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: '../__generated__/schema.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      },
    },
    'src/graphql/queries/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: '../__generated__/schema.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      },
    },
    'schema/schema.json': {
      plugins: ['introspection'],
      config: {
        minify: false,
      },
    },
    'schema/schema.graphql': {
      plugins: ['schema-ast'],
    },
    'src/apollo/possibleTypes.json': {
      plugins: ['fragment-matcher'],
    },
  },
  config: {
    namingConvention: 'keep',
    apolloClientVersion: 3,
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
};

export default config;
