import { TAX, SHIPPING_CHARGES } from "../config";

export const calculateTax = (total) => {
  const res = total * (TAX / 100);
  return res.toFixed(2);
};

export const shippingCharges = (total) => {
  return total > 5000 ? 0 : SHIPPING_CHARGES;
};

export const grandTotal = (total, ship, tax) => {
  return Number(total) + Number(ship) + Number(tax);
};
