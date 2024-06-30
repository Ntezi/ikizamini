import { DeliveryStatus, OrderStatus } from "./Enums";

export function OrderStatuses(status: number): string {
  if (status === OrderStatus.INITIATED_ORDER_STATUS) {
    return "INITIATED";
  } else if (status === OrderStatus.OPENED_ORDER_STATUS) {
    return "OPENED";
  } else if (status === OrderStatus.PROCESSED_ORDER_STATUS) {
    return "PROCESSED";
  } else if (status === OrderStatus.COMPLETED_ORDER_STATUS) {
    return "COMPLETED";
  } else if (status === OrderStatus.CLOSED_ORDER_STATUS) {
    return "CLOSED";
  } else if (status === OrderStatus.CANCELED_ORDER_STATUS) {
    return "CANCELED";
  } else if (status === OrderStatus.REJECTED_ORDER_STATUS) {
    return "REJECTED";
  } else if (status === OrderStatus.FAILED_ORDER_STATUS) {
    return "FAILED";
  } else {
    return "UNKNOWN";
  }
}

export function DeliveryStatuses(status: number): string {
  if (status === DeliveryStatus.PENDING_DELIVERY_STATUS) {
    return "PENDING";
  } else if (status === DeliveryStatus.DELIVERED_DELIVERY_STATUS) {
    return "DELIVERED";
  } else if (status === DeliveryStatus.CANCELLED_DELIVERY_STATUS) {
    return "CANCELLED";
  } else {
    return "UNKNOWN";
  }
}
