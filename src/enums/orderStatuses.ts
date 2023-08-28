enum OrderStatuses {
  PLACED = 'placed',
  MANIFESTED = 'manifested',
  READY_TO_SHIP = 'ready_to_ship',
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  NON_DELIVERY_REPORT = 'non_delivery_report',
  REATTEMPT = 'reattempt',
  RETURN_TO_ORIGIN = 'return_to_origin',
  RETURN_TO_ORIGIN_REQUESTED = 'return_to_origin_requested',
  RETURN_TO_ORIGIN_INITIATED = 'return_to_origin_initiated',
  DELIVERED = 'delivered',
  LOST = 'lost',
  DAMAGED = 'damaged',
  CANCELLED = 'cancelled',
}

export default OrderStatuses;
