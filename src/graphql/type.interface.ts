export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type Category = {
  __typename?: 'Category';
  communities?: Maybe<Array<Communities>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  orderIdx: Scalars['Float']['output'];
  tenantIds: Scalars['JSON']['output'];
  thumbnail: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CategoryPaginatedResponse = {
  __typename?: 'CategoryPaginatedResponse';
  items: Array<Category>;
  total: Scalars['Int']['output'];
};

export type Communities = {
  __typename?: 'Communities';
  categories: Array<Category>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  state: Scalars['String']['output'];
  status: Scalars['String']['output'];
  thumbnail_url: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CommunitiesPaginatedResponse = {
  __typename?: 'CommunitiesPaginatedResponse';
  items: Array<Communities>;
  total: Scalars['Int']['output'];
};

export type CreateCategoryInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  orderIdx?: InputMaybe<Scalars['Float']['input']>;
  tenantIds: Scalars['JSON']['input'];
  thumbnail: Scalars['String']['input'];
};

export type CreateCommunityInput = {
  categoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  state: Scalars['String']['input'];
  status: Scalars['String']['input'];
  thumbnail_url: Scalars['String']['input'];
};

export type CreateCustomerInfoInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  checkoutForm?: InputMaybe<Scalars['JSON']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  storeId: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};

export type CreateKitchenTemplateInput = {
  configuration?: InputMaybe<Scalars['JSON']['input']>;
  defaultSize: Scalars['JSON']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  enable?: InputMaybe<Scalars['Boolean']['input']>;
  floorPath?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  islandPath?: InputMaybe<Scalars['String']['input']>;
  kitchenPath: Scalars['String']['input'];
  name: Scalars['String']['input'];
  productIds: Scalars['JSON']['input'];
  tenantId: Scalars['String']['input'];
  thumbnail: Scalars['String']['input'];
};

export type CreateLeadInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  communityId?: InputMaybe<Scalars['String']['input']>;
  consultant?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  full_name: Scalars['String']['input'];
  home_specialist?: InputMaybe<Scalars['String']['input']>;
  lead_source?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  sale_agent?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  total_price?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateProductInput = {
  SKU?: InputMaybe<Scalars['String']['input']>;
  brandName?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  communitiesId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  moduleType?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRoleInput = {
  capabilities: Array<Scalars['String']['input']>;
  roleName: Scalars['String']['input'];
};

export type CreateSerieInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  tenantId?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type CreateStoreInput = {
  address: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  kitchenTemplateIds?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  serieIds: Scalars['JSON']['input'];
  tenantId?: InputMaybe<Scalars['String']['input']>;
  tenantName: Scalars['String']['input'];
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type CreateStyleInput = {
  default?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  path: Scalars['String']['input'];
  serieIds: Scalars['JSON']['input'];
  tenantIds: Scalars['JSON']['input'];
  type: Scalars['String']['input'];
};

export type CreateTenantInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  domain: Scalars['String']['input'];
  emailSender?: InputMaybe<Scalars['JSON']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  settings?: InputMaybe<Scalars['JSON']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CustomerInfo = {
  __typename?: 'CustomerInfo';
  address?: Maybe<Scalars['String']['output']>;
  checkoutForm?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  storeId?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CustomerInfoPaginatedResponse = {
  __typename?: 'CustomerInfoPaginatedResponse';
  items: Array<CustomerInfo>;
  total: Scalars['Int']['output'];
};

export type FilterCategoryInput = {
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type FilterCommunityInput = {
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type FilterCustomerInfoInput = {
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type FilterKitchenTemplateInput = {
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  enable?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type FilterLeadInput = {
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type FilterProductInput = {
  communitiesId?: InputMaybe<Scalars['String']['input']>;
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  enable?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type FilterRoleInput = {
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type FilterSerieInput = {
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type FilterStoreInput = {
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type FilterStyleInput = {
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  default?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type FilterTenantInput = {
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type FilterUserInput = {
  createFrom?: InputMaybe<Scalars['String']['input']>;
  createTo?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type KitchenTemplate = {
  __typename?: 'KitchenTemplate';
  configuration?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  defaultSize: Scalars['JSON']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enable: Scalars['Boolean']['output'];
  floorPath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  islandPath?: Maybe<Scalars['String']['output']>;
  kitchenPath: Scalars['String']['output'];
  name: Scalars['String']['output'];
  productIds: Scalars['JSON']['output'];
  tenantId: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type KitchenTemplatePaginatedResponse = {
  __typename?: 'KitchenTemplatePaginatedResponse';
  items: Array<KitchenTemplate>;
  total: Scalars['Int']['output'];
};

export type Lead = {
  __typename?: 'Lead';
  address?: Maybe<Scalars['String']['output']>;
  community?: Maybe<Communities>;
  communityId?: Maybe<Scalars['String']['output']>;
  consultant?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  full_name: Scalars['String']['output'];
  home_specialist?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lead_source?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['Int']['output']>;
  sale_agent?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['String']['output']>;
  total_price?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type LeadPaginatedResponse = {
  __typename?: 'LeadPaginatedResponse';
  items: Array<Lead>;
  total: Scalars['Int']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type LogoutInput = {
  deviceToken: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignRoleToUser: User;
  createCategory: Category;
  createCommunity: Communities;
  createCustomerInfo: CustomerInfo;
  createKitchenTemplate: KitchenTemplate;
  createLead: Lead;
  createProduct: Product;
  createRole: Role;
  createSerie: Serie;
  createStore: Store;
  createStyle: Style;
  createTenant: Tenant;
  createUser: User;
  login: LoginResponse;
  logout: Scalars['Boolean']['output'];
  refreshToken: RefreshTokenResponse;
  removeCategories: Scalars['Boolean']['output'];
  removeCommunities: Scalars['Boolean']['output'];
  removeCustomerInfos: Scalars['Boolean']['output'];
  removeKitchenTemplates: Scalars['Boolean']['output'];
  removeLeads: Scalars['Boolean']['output'];
  removeProducts: Scalars['Boolean']['output'];
  removeRoleFromUser: User;
  removeRoles: Scalars['Boolean']['output'];
  removeSeries: Scalars['Boolean']['output'];
  removeStores: Scalars['Boolean']['output'];
  removeStyles: Scalars['Boolean']['output'];
  removeTenants: Scalars['Boolean']['output'];
  removeUsers: Scalars['Boolean']['output'];
  updateCategory: Category;
  updateCommunity: Communities;
  updateCustomerInfo: CustomerInfo;
  updateKitchenTemplate: KitchenTemplate;
  updateLead: Lead;
  updateProduct: Product;
  updateRole: Role;
  updateSerie: Serie;
  updateStore: Store;
  updateStyle: Style;
  updateTenant: Tenant;
};

export type MutationAssignRoleToUserArgs = {
  roleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};

export type MutationCreateCommunityArgs = {
  createCommunityInput: CreateCommunityInput;
};

export type MutationCreateCustomerInfoArgs = {
  createCustomerInfoInput: CreateCustomerInfoInput;
};

export type MutationCreateKitchenTemplateArgs = {
  createKitchenTemplateInput: CreateKitchenTemplateInput;
};

export type MutationCreateLeadArgs = {
  createLeadInput: CreateLeadInput;
};

export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};

export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};

export type MutationCreateSerieArgs = {
  createSerieInput: CreateSerieInput;
};

export type MutationCreateStoreArgs = {
  createStoreInput: CreateStoreInput;
};

export type MutationCreateStyleArgs = {
  createStyleInput: CreateStyleInput;
};

export type MutationCreateTenantArgs = {
  createTenantInput: CreateTenantInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationLogoutArgs = {
  input: LogoutInput;
};

export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};

export type MutationRemoveCategoriesArgs = {
  categoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type MutationRemoveCommunitiesArgs = {
  communityIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type MutationRemoveCustomerInfosArgs = {
  customerInfoIds: Array<Scalars['ID']['input']>;
};

export type MutationRemoveKitchenTemplatesArgs = {
  kitchenTemplateIds: Array<Scalars['ID']['input']>;
};

export type MutationRemoveLeadsArgs = {
  leadIds: Array<Scalars['ID']['input']>;
};

export type MutationRemoveProductsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type MutationRemoveRoleFromUserArgs = {
  roleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationRemoveRolesArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type MutationRemoveSeriesArgs = {
  serieIds: Array<Scalars['ID']['input']>;
};

export type MutationRemoveStoresArgs = {
  storeIds: Array<Scalars['ID']['input']>;
};

export type MutationRemoveStylesArgs = {
  styleIds: Array<Scalars['ID']['input']>;
};

export type MutationRemoveTenantsArgs = {
  tenantIds: Array<Scalars['ID']['input']>;
};

export type MutationRemoveUsersArgs = {
  userIds: Array<Scalars['Int']['input']>;
};

export type MutationUpdateCategoryArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  updateCategoryInput?: InputMaybe<UpdateCategoryInput>;
};

export type MutationUpdateCommunityArgs = {
  communityId?: InputMaybe<Scalars['ID']['input']>;
  updateCommunityInput?: InputMaybe<UpdateCommunityInput>;
};

export type MutationUpdateCustomerInfoArgs = {
  customerInfoId: Scalars['ID']['input'];
  updateCustomerInfoInput: UpdateCustomerInfoInput;
};

export type MutationUpdateKitchenTemplateArgs = {
  kitchenTemplateId?: InputMaybe<Scalars['ID']['input']>;
  updateKitchenTemplateInput?: InputMaybe<UpdateKitchenTemplateInput>;
};

export type MutationUpdateLeadArgs = {
  leadId?: InputMaybe<Scalars['ID']['input']>;
  updateLeadInput?: InputMaybe<UpdateLeadInput>;
};

export type MutationUpdateProductArgs = {
  id: Scalars['Int']['input'];
  updateProductInput: UpdateProductInput;
};

export type MutationUpdateRoleArgs = {
  updateRoleInput: UpdateRoleInput;
};

export type MutationUpdateSerieArgs = {
  serieId?: InputMaybe<Scalars['ID']['input']>;
  updateSerieInput?: InputMaybe<UpdateSerieInput>;
};

export type MutationUpdateStoreArgs = {
  storeId?: InputMaybe<Scalars['ID']['input']>;
  updateStoreInput?: InputMaybe<UpdateStoreInput>;
};

export type MutationUpdateStyleArgs = {
  styleId?: InputMaybe<Scalars['ID']['input']>;
  updateStyleInput?: InputMaybe<UpdateStyleInput>;
};

export type MutationUpdateTenantArgs = {
  tenantId?: InputMaybe<Scalars['ID']['input']>;
  updateTenantInput?: InputMaybe<UpdateTenantInput>;
};

export type Product = {
  __typename?: 'Product';
  SKU?: Maybe<Scalars['String']['output']>;
  availableSizes?: Maybe<Scalars['JSON']['output']>;
  brandName?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  communities?: Maybe<Communities>;
  communitiesId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  defaultSize?: Maybe<Scalars['JSON']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enable?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  moduleType?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  offset?: Maybe<Scalars['JSON']['output']>;
  path: Scalars['String']['output'];
  position?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  serieIds?: Maybe<Scalars['JSON']['output']>;
  storeIds?: Maybe<Scalars['JSON']['output']>;
  thumbnail: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductPaginatedResponse = {
  __typename?: 'ProductPaginatedResponse';
  items: Array<Product>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  categories: CategoryPaginatedResponse;
  category: Category;
  categoryAdmin: Category;
  communities: CommunitiesPaginatedResponse;
  community: Communities;
  communityAdmin: Communities;
  customerInfo: CustomerInfo;
  customerInfoAdmin: CustomerInfo;
  customerInfos: CustomerInfoPaginatedResponse;
  getUserById: User;
  getUserWithRoles: User;
  getUsers: UserPaginatedResponse;
  kitchenTemplate: KitchenTemplate;
  kitchenTemplateAdmin: KitchenTemplate;
  kitchenTemplates: KitchenTemplatePaginatedResponse;
  lead: Lead;
  leadAdmin: Lead;
  leads: LeadPaginatedResponse;
  me: User;
  product: Product;
  productAdmin: Product;
  products: ProductPaginatedResponse;
  publicCategories: CategoryPaginatedResponse;
  publicCommunities: CommunitiesPaginatedResponse;
  publicCustomerInfos: CustomerInfoPaginatedResponse;
  publicKitchenTemplates: KitchenTemplatePaginatedResponse;
  publicLeads: LeadPaginatedResponse;
  publicProducts: ProductPaginatedResponse;
  publicSeries: SeriePaginatedResponse;
  publicStores: StorePaginatedResponse;
  publicStyles: StylePaginatedResponse;
  publicTenants: TenantPaginatedResponse;
  role: Role;
  roleByName: Role;
  roles: RolePaginatedResponse;
  serie: Serie;
  serieAdmin: Serie;
  series: SeriePaginatedResponse;
  store: Store;
  storeAdmin: Store;
  stores: StorePaginatedResponse;
  style: Style;
  styleAdmin: Style;
  styles: StylePaginatedResponse;
  tenant: Tenant;
  tenantAdmin: Tenant;
  tenants: TenantPaginatedResponse;
};

export type QueryCategoriesArgs = {
  filter?: InputMaybe<FilterCategoryInput>;
};

export type QueryCategoryArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryCommunitiesArgs = {
  filter?: InputMaybe<FilterCommunityInput>;
};

export type QueryCommunityArgs = {
  communityId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryCustomerInfoArgs = {
  customerInfoId: Scalars['ID']['input'];
};

export type QueryCustomerInfosArgs = {
  filter?: InputMaybe<FilterCustomerInfoInput>;
};

export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetUserWithRolesArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetUsersArgs = {
  filter?: InputMaybe<FilterUserInput>;
};

export type QueryKitchenTemplateArgs = {
  kitchenTemplateId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryKitchenTemplatesArgs = {
  filter?: InputMaybe<FilterKitchenTemplateInput>;
};

export type QueryLeadArgs = {
  leadId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryLeadsArgs = {
  filter?: InputMaybe<FilterLeadInput>;
};

export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};

export type QueryProductsArgs = {
  filter?: InputMaybe<FilterProductInput>;
};

export type QueryPublicCategoriesArgs = {
  filter?: InputMaybe<FilterCategoryInput>;
};

export type QueryPublicCommunitiesArgs = {
  filter?: InputMaybe<FilterCommunityInput>;
};

export type QueryPublicCustomerInfosArgs = {
  filter?: InputMaybe<FilterCustomerInfoInput>;
};

export type QueryPublicKitchenTemplatesArgs = {
  filter?: InputMaybe<FilterKitchenTemplateInput>;
};

export type QueryPublicLeadsArgs = {
  filter?: InputMaybe<FilterLeadInput>;
};

export type QueryPublicProductsArgs = {
  filter?: InputMaybe<FilterProductInput>;
};

export type QueryPublicSeriesArgs = {
  filter?: InputMaybe<FilterSerieInput>;
};

export type QueryPublicStoresArgs = {
  filter?: InputMaybe<FilterStoreInput>;
};

export type QueryPublicStylesArgs = {
  filter?: InputMaybe<FilterStyleInput>;
};

export type QueryPublicTenantsArgs = {
  filter?: InputMaybe<FilterTenantInput>;
};

export type QueryRoleArgs = {
  id: Scalars['Int']['input'];
};

export type QueryRoleByNameArgs = {
  roleName: Scalars['String']['input'];
};

export type QueryRolesArgs = {
  filter?: InputMaybe<FilterRoleInput>;
};

export type QuerySerieArgs = {
  serieId?: InputMaybe<Scalars['ID']['input']>;
};

export type QuerySeriesArgs = {
  filter?: InputMaybe<FilterSerieInput>;
};

export type QueryStoreArgs = {
  storeId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryStoresArgs = {
  filter?: InputMaybe<FilterStoreInput>;
};

export type QueryStyleArgs = {
  styleId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryStylesArgs = {
  filter?: InputMaybe<FilterStyleInput>;
};

export type QueryTenantArgs = {
  tenantId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryTenantsArgs = {
  filter?: InputMaybe<FilterTenantInput>;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'Role';
  capabilities: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  roleName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RolePaginatedResponse = {
  __typename?: 'RolePaginatedResponse';
  items: Array<Role>;
  total: Scalars['Int']['output'];
};

export type Serie = {
  __typename?: 'Serie';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tenantId?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SeriePaginatedResponse = {
  __typename?: 'SeriePaginatedResponse';
  items: Array<Serie>;
  total: Scalars['Int']['output'];
};

export type Store = {
  __typename?: 'Store';
  address: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kitchenTemplateIds?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  serieIds: Scalars['JSON']['output'];
  tenantId?: Maybe<Scalars['String']['output']>;
  tenantName: Scalars['String']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type StorePaginatedResponse = {
  __typename?: 'StorePaginatedResponse';
  items: Array<Store>;
  total: Scalars['Int']['output'];
};

export type Style = {
  __typename?: 'Style';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  default?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  serieIds?: Maybe<Scalars['JSON']['output']>;
  tenantIds?: Maybe<Scalars['JSON']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type StylePaginatedResponse = {
  __typename?: 'StylePaginatedResponse';
  items: Array<Style>;
  total: Scalars['Int']['output'];
};

export type Tenant = {
  __typename?: 'Tenant';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  emailSender?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  settings?: Maybe<Scalars['JSON']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TenantPaginatedResponse = {
  __typename?: 'TenantPaginatedResponse';
  items: Array<Tenant>;
  total: Scalars['Int']['output'];
};

export type UpdateCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  orderIdx?: InputMaybe<Scalars['Float']['input']>;
  tenantIds?: InputMaybe<Scalars['JSON']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommunityInput = {
  categoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  thumbnail_url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerInfoInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  checkoutForm?: InputMaybe<Scalars['JSON']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateKitchenTemplateInput = {
  configuration?: InputMaybe<Scalars['JSON']['input']>;
  defaultSize?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enable?: InputMaybe<Scalars['Boolean']['input']>;
  floorPath?: InputMaybe<Scalars['String']['input']>;
  islandPath?: InputMaybe<Scalars['String']['input']>;
  kitchenPath?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productIds?: InputMaybe<Scalars['JSON']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLeadInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  communityId?: InputMaybe<Scalars['String']['input']>;
  consultant?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  home_specialist?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lead_source?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  sale_agent?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  total_price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateProductInput = {
  SKU?: InputMaybe<Scalars['String']['input']>;
  brandName?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  communitiesId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enable?: InputMaybe<Scalars['Boolean']['input']>;
  moduleType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  capabilities?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['Int']['input'];
  roleName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSerieInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStoreInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  kitchenTemplateIds?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  serieIds?: InputMaybe<Scalars['JSON']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  tenantName?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStyleInput = {
  default?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  serieIds?: InputMaybe<Scalars['JSON']['input']>;
  tenantIds?: InputMaybe<Scalars['JSON']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTenantInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  emailSender?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  settings?: InputMaybe<Scalars['JSON']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  accessToken?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  password: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Role>>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserPaginatedResponse = {
  __typename?: 'UserPaginatedResponse';
  items: Array<User>;
  total: Scalars['Int']['output'];
};
