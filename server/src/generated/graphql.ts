import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../server'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X]
} &
    { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
}

export type User = {
    __typename?: 'User'
    id?: Maybe<Scalars['String']>
    username?: Maybe<Scalars['String']>
    password?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    createdAt?: Maybe<Scalars['String']>
    updatedAt?: Maybe<Scalars['String']>
}

export type Car = {
    __typename?: 'Car'
    id?: Maybe<Scalars['String']>
    isActive?: Maybe<Scalars['Boolean']>
    make?: Maybe<Scalars['String']>
    model?: Maybe<Scalars['String']>
    year?: Maybe<Scalars['String']>
    userID?: Maybe<Scalars['String']>
    User?: Maybe<User>
    vin?: Maybe<Scalars['String']>
    createdAt?: Maybe<Scalars['String']>
    updatedAt?: Maybe<Scalars['String']>
}

export type TokenAuth = {
    __typename?: 'TokenAuth'
    token: Scalars['String']
    refresh: Scalars['String']
    user: User
}

export type CreateCarInput = {
    isActive: Scalars['Boolean']
    make: Scalars['String']
    model: Scalars['String']
    year: Scalars['String']
    vin: Scalars['String']
}

export type UpdateCarInput = {
    isActive: Scalars['Boolean']
    make: Scalars['String']
    model: Scalars['String']
    year: Scalars['String']
    id: Scalars['String']
    vin: Scalars['String']
}

export type CreateUserInput = {
    username: Scalars['String']
    password: Scalars['String']
    email: Scalars['String']
}

export type Query = {
    __typename?: 'Query'
    carsByUserID: Array<Maybe<Car>>
    login: TokenAuth
}

export type QueryLoginArgs = {
    username: Scalars['String']
    password: Scalars['String']
}

export type Mutation = {
    __typename?: 'Mutation'
    createCar: Car
    updateCar: Car
    deleteCar: Scalars['String']
    createUser: TokenAuth
}

export type MutationCreateCarArgs = {
    data: CreateCarInput
}

export type MutationUpdateCarArgs = {
    data: UpdateCarInput
}

export type MutationDeleteCarArgs = {
    id: Scalars['String']
}

export type MutationCreateUserArgs = {
    data: CreateUserInput
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
    | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
    | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {}
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {}
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
    User: ResolverTypeWrapper<any>
    String: ResolverTypeWrapper<any>
    Car: ResolverTypeWrapper<any>
    Boolean: ResolverTypeWrapper<any>
    TokenAuth: ResolverTypeWrapper<any>
    CreateCarInput: ResolverTypeWrapper<any>
    UpdateCarInput: ResolverTypeWrapper<any>
    CreateUserInput: ResolverTypeWrapper<any>
    Query: ResolverTypeWrapper<{}>
    Mutation: ResolverTypeWrapper<{}>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
    User: any
    String: any
    Car: any
    Boolean: any
    TokenAuth: any
    CreateCarInput: any
    UpdateCarInput: any
    CreateUserInput: any
    Query: {}
    Mutation: {}
}>

export type UserResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
    id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    username?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    password?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    createdAt?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    updatedAt?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CarResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['Car'] = ResolversParentTypes['Car']
> = ResolversObject<{
    id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    isActive?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >
    make?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    model?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    year?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    userID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
    vin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    createdAt?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    updatedAt?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type TokenAuthResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['TokenAuth'] = ResolversParentTypes['TokenAuth']
> = ResolversObject<{
    token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    refresh?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type QueryResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
    carsByUserID?: Resolver<
        Array<Maybe<ResolversTypes['Car']>>,
        ParentType,
        ContextType
    >
    login?: Resolver<
        ResolversTypes['TokenAuth'],
        ParentType,
        ContextType,
        RequireFields<QueryLoginArgs, 'username' | 'password'>
    >
}>

export type MutationResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
    createCar?: Resolver<
        ResolversTypes['Car'],
        ParentType,
        ContextType,
        RequireFields<MutationCreateCarArgs, 'data'>
    >
    updateCar?: Resolver<
        ResolversTypes['Car'],
        ParentType,
        ContextType,
        RequireFields<MutationUpdateCarArgs, 'data'>
    >
    deleteCar?: Resolver<
        ResolversTypes['String'],
        ParentType,
        ContextType,
        RequireFields<MutationDeleteCarArgs, 'id'>
    >
    createUser?: Resolver<
        ResolversTypes['TokenAuth'],
        ParentType,
        ContextType,
        RequireFields<MutationCreateUserArgs, 'data'>
    >
}>

export type Resolvers<ContextType = Context> = ResolversObject<{
    User?: UserResolvers<ContextType>
    Car?: CarResolvers<ContextType>
    TokenAuth?: TokenAuthResolvers<ContextType>
    Query?: QueryResolvers<ContextType>
    Mutation?: MutationResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>
