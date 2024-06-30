import {
  Api,
  BaseQueryFn,
  coreModuleName,
  createApi,
  EndpointBuilder,
  EndpointDefinitions,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  MutationDefinition,
  reactHooksModuleName,
} from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { logout } from "../../features/auth/authSlice";
import { isExists } from "./index";
import { ApiState } from "./Types";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { EntityId, EntityState } from "@reduxjs/toolkit";

/**
 * The `RTKHelper` class provides a comprehensive toolkit for creating Redux Toolkit Query endpoints with enhanced functionality and streamlined processes.
 * This utility class includes methods for creating mutation and query endpoints, handling search queries, managing API slices, and incorporating token-based authentication with automatic re-authentication capabilities.
 *
 * Key Features:
 * 1. **createMutationEndpoint**: Simplifies the creation of mutation endpoints with support for various HTTP methods and automatic tag invalidation.
 * 2. **createQueryEndpoint**: Facilitates the creation of query endpoints with transformation and tag provisioning, making data fetching and caching more efficient.
 * 3. **createSearchQueryEndpoint**: Designed for search queries, it returns results in an `EntityState`, supporting complex state management needs.
 * 4. **createApiSlice**: Initializes a Redux Toolkit API slice with re-authentication logic, ensuring secure and seamless API interactions.
 * 5. **checkAuthExpired**: A utility function that checks for expired tokens and triggers a logout if necessary, enhancing security.
 * 6. **queryWithReAuth**: An enhanced base query function that includes token management and automatic re-authentication, ensuring consistent and secure API communication.
 * */
export class RTKHelper {
  static createMutationEndpoint<
    QueryArg,
    ResultType = unknown,
    TagTypes extends string = string,
  >(
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
  ): MutationDefinition<
    QueryArg,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    TagTypes,
    ResultType,
    string
  > {
    return builder.mutation({ query: queryFn, invalidatesTags });
  }

  static createQueryEndpoint<
    QueryArg,
    ResultType,
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
    ) => ResultType | Promise<ResultType>,
    providesTags: (
      result: ResultType | undefined,
      error: FetchBaseQueryError | undefined,
      arg: QueryArg,
    ) => TagTypes[],
  ): QueryDefinition<
    QueryArg,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    TagTypes,
    ResultType,
    string
  > {
    return builder.query({ query: queryFn, transformResponse, providesTags });
  }

  static createSearchQueryEndpoint<
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
  ): QueryDefinition<
    QueryArg,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    TagTypes,
    EntityState<ResultType, IdType>,
    string
  > {
    return builder.query({ query: queryFn, transformResponse, providesTags });
  }

  static createApiSlice<TagTypes extends string = string>(
    baseUrl: string,
    reducerPath: string,
    tagTypes: TagTypes[],
  ): Api<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    EndpointDefinitions,
    string,
    TagTypes,
    typeof coreModuleName | typeof reactHooksModuleName
  > {
    const baseQueryWithReAuth: BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError
    > = RTKHelper.queryWithReAuth(baseUrl);

    return createApi({
      baseQuery: baseQueryWithReAuth,
      reducerPath,
      tagTypes,
      endpoints: (builder) => {
        const endpoints: EndpointDefinitions = {};
        return endpoints;
      },
    });
  }

  static checkAuthExpired(api: BaseQueryApi): void {
    const state = api.getState() as ApiState;
    const { auth } = state;

    if (!isExists(auth) || !isExists(auth.user) || !isExists(auth.token)) {
      api.dispatch(logout());
      return;
    }

    const payload = jwtDecode<JwtPayload>(auth.token);

    if (
      !isExists(payload) ||
      !isExists(payload.exp) ||
      !isExists(payload.exp)
    ) {
      api.dispatch(logout());
      return;
    }

    const now = dayjs().unix();

    if (now >= payload.exp) {
      api.dispatch(logout());
    }
  }

  static queryWithReAuth(
    baseUrl: string,
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {
    const baseQuery = fetchBaseQuery({
      baseUrl,
      credentials: "include",
      prepareHeaders: (headers, { getState }) => {
        const { auth: { token = "" } = {} } = getState() as ApiState;

        if (isExists(token)) {
          headers.set("authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
        headers.set("Access-Control-Allow-Origin", "*");

        return headers;
      },
    });

    return async (args, api, extraOptions) => {
      const result = await baseQuery(args, api, extraOptions);
      RTKHelper.checkAuthExpired(api);
      return result;
    };
  }
}
