import {
  Api,
  BaseQueryFn,
  coreModuleName,
  EndpointBuilder,
  EndpointDefinitions,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
  reactHooksModuleName,
} from "@reduxjs/toolkit/query/react";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { EntityId, EntityState } from "@reduxjs/toolkit";
import { JwtPayload } from "jwt-decode";

export interface IRTKHelper {
  createMutationEndpoint: <QueryArg, ResultType, TagTypes extends string>(
    builder: EndpointBuilder<
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      TagTypes,
      string
    >,
    queryFn: (arg: QueryArg) => {
      url: string;
      method: "POST" | "PUT" | "DELETE" | "PATCH";
      body: unknown;
    },
    invalidatesTags: Array<{ type: TagTypes; id: string | number }>,
  ) => MutationDefinition<
    QueryArg,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    TagTypes,
    ResultType,
    string
  >;

  createQueryEndpoint: <QueryArg, ResultType, TagTypes extends string>(
    builder: EndpointBuilder<
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      TagTypes,
      string
    >,
    queryFn: (arg: QueryArg) => string,
    transformResponse: (
      baseQueryReturnValue: { data: ResultType },
      meta: Record<string, unknown> | undefined,
      arg: QueryArg,
    ) => ResultType | Promise<ResultType>,
    providesTags: (
      result: ResultType | undefined,
      error: FetchBaseQueryError | undefined,
      arg: QueryArg,
    ) => TagTypes[],
  ) => QueryDefinition<
    QueryArg,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    TagTypes,
    ResultType,
    string
  >;

  createSearchQueryEndpoint: <
    QueryArg,
    ResultType,
    IdType extends EntityId = EntityId,
    TagTypes extends string = string,
  >(
    builder: EndpointBuilder<
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      TagTypes,
      string
    >,
    queryFn: (arg: QueryArg) => string,
    transformResponse: (
      baseQueryReturnValue: { data: ResultType },
      meta: Record<string, unknown> | undefined,
      arg: QueryArg,
    ) =>
      | EntityState<ResultType, IdType>
      | Promise<EntityState<ResultType, IdType>>,
    providesTags: (
      result: EntityState<ResultType, IdType> | undefined,
      error: FetchBaseQueryError | undefined,
      arg: QueryArg,
    ) => TagTypes[],
  ) => QueryDefinition<
    QueryArg,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    TagTypes,
    EntityState<ResultType, IdType>,
    string
  >;

  createApiSlice: <TagTypes extends string = string>(
    baseUrl: string,
    reducerPath: string,
    tagTypes: TagTypes[],
  ) => Api<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    EndpointDefinitions,
    string,
    TagTypes,
    typeof coreModuleName | typeof reactHooksModuleName
  >;

  isJwtPayload: (payload: JwtPayload) => payload is JwtPayload;

  checkAuthExpired: (api: BaseQueryApi) => void;

  queryWithReAuth: (
    baseUrl: string,
  ) => BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;
}
