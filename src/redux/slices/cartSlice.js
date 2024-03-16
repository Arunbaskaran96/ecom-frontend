import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
import { useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";

const { getItem } = useLocalStorage("token");
const token = getItem();

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = await fetch(`${BASE_URL}/cart/${userId}`, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
});

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (formData) => {
    const { userId, data } = formData;
    const response = await fetch(`${BASE_URL}/removecart/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cart: {
      success: null,
      cartItems: [],
    },
    grandSubTotal: 0,
    error: null,
  },
  reducers: {
    addQuantityCart: (state, action) => {
      state.cart.cartItems.map((prod) =>
        prod.productId._id == action.payload.productId._id
          ? ((prod.quantity += 1),
            (prod.subTotal = prod.quantity * prod.productId.price))
          : prod
      );
      state.grandSubTotal += action.payload.productId.price;
    },
    subQuantityCart: (state, action) => {
      state.cart.cartItems.map((prod) =>
        prod.productId._id == action.payload.productId._id
          ? ((prod.quantity -= 1),
            (prod.subTotal = prod.quantity * prod.productId.price))
          : prod
      );
      state.grandSubTotal -= action.payload.productId.price;
    },
    removeCart: (state, action) => {
      state.cart.cartItems = state.cart.cartItems.filter(
        (item) => item._id != action.payload._id
      );
      state.grandSubTotal -= action.payload.subTotal;
    },
    calculateGrandTotal: (state) => {
      const prodPrice = state.cart?.cartItems?.map((item) => item.subTotal);
      state.cart.grandTotal = prodPrice?.reduce((acc, val) => acc + val, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        (state.loading = true), (state.error = null), (state.cart = {});
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.cart = action.payload);
        const prodPrice = action.payload.cartItems.map((item) => item.subTotal);
        const total = prodPrice?.reduce((acc, val) => acc + val, 0);
        state.grandSubTotal = total;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload),
          (state.cart = {});
      });
  },
});

export const cartSelector = () => {
  return useSelector((state) => state.cart);
};

export const {
  addQuantityCart,
  subQuantityCart,
  removeCart,
  calculateGrandTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
