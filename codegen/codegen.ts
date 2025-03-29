import dotenv from 'dotenv';

dotenv.config({ path: '.env.dev' });

module.exports = {
  overwrite: true,
  schema: [process.env.VITE_PUBLIC_API_DOMAIN + '/graphql'],
  generates: {
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
