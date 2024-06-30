export enum CartType {
  PURCHASE_CART_TYPE = 1,
  SALE_CART_TYPE = 2,
}

export enum CartItemsType {
  CART_ITEMS_TYPE = 1,
  PURCHASE_ORDER_CART_ITEMS_TYPE = 2,
  PURCHASE_CART_ITEMS_TYPE = 3,
  DELIVERY_CART_ITEMS_TYPE = 4,
  ADJUSTMENT_CART_ITEMS_TYPE = 5,
}

export enum OrderStatus {
  INITIATED_ORDER_STATUS = 1, // When the order is created and not yet placed. This is the default status.
  OPENED_ORDER_STATUS = 2, // When the order is placed and not yet processed. This will initiate the transaction in Payment service.
  PROCESSED_ORDER_STATUS = 3, // When the order is processed and not yet closed. This will set the transaction status to pending.
  COMPLETED_ORDER_STATUS = 4, // When the order is paid and not yet closed. This will set the transaction status to complete.
  CLOSED_ORDER_STATUS = 5, // When the order is closed. This will create an invoice in Purchase service or Sale service.
  CANCELED_ORDER_STATUS = 6, // When the order is canceled. This will set the transaction status to cancel.
  REJECTED_ORDER_STATUS = 7, // When the order is rejected. This will set the transaction status to failed.
  FAILED_ORDER_STATUS = 8, // When the order is failed. This will set the transaction status to failed.
}

export enum DeliveryStatus {
  PENDING_DELIVERY_STATUS = 1, // When the delivery is created and not yet received. This is the default status.
  DELIVERED_DELIVERY_STATUS = 2, // When the delivery is received.
  CANCELLED_DELIVERY_STATUS = 3, // When the delivery is canceled. This will set the transaction status to cancel.
}

export enum TransactionStatus {
  INITIATED_TRANSACTION_STATUS = 1,
  PENDING_TRANSACTION_STATUS = 2,
  COMPLETED_TRANSACTION_STATUS = 3,
  FAILED_TRANSACTION_STATUS = 4,
  REFUNDED_TRANSACTION_STATUS = 5,
  CANCELED_TRANSACTION_STATUS = 6,
  REJECTED_TRANSACTION_STATUS = 7,
}

export enum InventoryType {
  IN_INVENTORY_TYPE = 1,
  OUT_INVENTORY_TYPE = 2,
}

export enum StockEntryType {
  PURCHASE_STOCK_ENTRY_TYPE = 1,
  INVENTORY_STOCK_ENTRY_TYPE = 2,
  REFUND_STOCK_ENTRY_TYPE = 3,
}

export enum PurchaseCreditType {
  YES = 1,
  NO = 0,
}

export enum YesNoType {
  YES = 1,
  NO = 0,
}

export enum StockAdjustmentType {
  IN_STOCK_ADJUSTMENT_TYPE = 1, // When the stock adjustment is created for incoming. (e.g: counting, etc.)
  OUT_STOCK_ADJUSTMENT_TYPE = 2, // When the stock adjustment is created for outgoing. (e.g:  expired, damaged, etc.)
}
