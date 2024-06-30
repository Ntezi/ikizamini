import {
  BaseQueryApi,
  QueryReturnValue,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import React from "react";
import { CartItem } from "../../features/cart/models/CartItem";
import { Cart } from "../../features/cart/models/Cart";
import { CartType, DeliveryStatus, OrderStatus } from "./Enums";
import { DeliveryItem } from "../../features/delivery/models/DeliveryItem";

export interface AccessToken {
  user: User;
  token: string | never;
}

export interface User {
  id: number;
  role_id: number;
  username: string;
  password: string;
  email: string;
  is_active?: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginData {
  access_token: string;
  refresh_token: string;
  profile: User;
}

export interface AuthState {
  user: User | undefined;
  token: string | undefined;
}

export type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = unknown,
  Meta = unknown,
  Definitions = BaseQueryApi,
> = (
  args: Args,
  api: Definitions,
  extraOptions: any,
) => MaybePromise<QueryReturnValue<Result, Error, Meta>>;

export interface ApiState {
  auth: {
    user?: unknown;
    token?: string;
  };
}

export interface Response {
  request_id: string;
  path: string;
  method: string;
  status_code: number;
  message: string;
  data: unknown;
}

export interface AccordionItem {
  id: number | string;
  title: React.ReactNode;
  children: React.ReactNode;
  buttons: React.ReactNode;
}

export type PaginatedResponse<T extends Record<string, any>> = {
  count: number;
  pages: number;
} & T;

export interface Pagination {
  page: number;
  limit: number;
  totalPages?: number;
  hasPrev: boolean;
  hasNextPage: boolean;
  handlePrev: () => void;
  handleNext: () => void;
}

export interface PaginationContext extends Pagination {
  dispatchPage: React.Dispatch<{ type: string }>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

export interface PaginationLogic extends Pagination {
  onPageChange: (newPage: number) => void;
}

export interface IconProps {
  className: string;
}

export type PayloadItem = Omit<CartItem, "total_price">;

export interface CartPayload extends Omit<Cart, "items"> {
  id: number;
  cart_name: string;
  cart_uuid: string;
  cart_type: CartType;
  is_active: boolean;
  items: PayloadItem[];
}

export interface OrderPayload {
  supplier_id: number | undefined;
  status: OrderStatus | undefined;
  is_active: boolean | undefined;
  reference: string | undefined;
  is_credit: boolean | undefined;
  is_paid: boolean | undefined;
  is_delivered: boolean | undefined;
  items: PayloadItem[] | undefined;
}

export interface DeliveryPayload {
  note: string | undefined;
  status: DeliveryStatus | undefined;
  is_active: boolean | undefined;
  items: DeliveryItem[] | undefined;
}

export interface AdjustmentPayload {
  stock_location_id: number | undefined;
  item_id: number | undefined;
  expiration_date: string | undefined;
  batch_number: string | undefined;
  quantity: number | undefined;
  unit_cost: number | undefined;
  reference: string | undefined;
}

export interface AppError extends Error {
  status?: number;
  message: string;
}
