import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  login: User;
  productCreate: ProductCreateResponse;
};

export type MutationcreateUserArgs = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationloginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationproductCreateArgs = {
  product: ProductCreateInput;
};

export type Option = {
  __typename?: "Option";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  optionValues: Array<OptionValue>;
  position: Scalars["Float"]["output"];
};

export type OptionValue = {
  __typename?: "OptionValue";
  hasVariants: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type OptionValueInput = {
  name: Scalars["String"]["input"];
};

export type Product = {
  __typename?: "Product";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  image: Scalars["String"]["output"];
  price: Scalars["Float"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type ProductCreateInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  image: Scalars["String"]["input"];
  price: Scalars["Float"]["input"];
  productOptions: Array<ProductOptionInput>;
  title: Scalars["String"]["input"];
};

export type ProductCreateResponse = {
  __typename?: "ProductCreateResponse";
  product?: Maybe<ProductData>;
  userErrors: Array<UserError>;
};

export type ProductData = {
  __typename?: "ProductData";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  image: Scalars["String"]["output"];
  options: Array<Option>;
  price: Scalars["Float"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type ProductOptionInput = {
  name: Scalars["String"]["input"];
  values: Array<OptionValueInput>;
};

export type Query = {
  __typename?: "Query";
  getProducts: Array<Product>;
  getUserById: User;
  getUsers: Array<User>;
};

export type QuerygetUserByIdArgs = {
  id: Scalars["Int"]["input"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  password?: Maybe<Scalars["String"]["output"]>;
};

export type UserError = {
  __typename?: "UserError";
  field: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
};
