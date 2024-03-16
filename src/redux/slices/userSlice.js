import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useSelector } from "react-redux";

const { setItem, getItem } = useLocalStorage("token");
const token = getItem();

export const signin = createAsyncThunk("user/signin", async (formData) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const result = await response.json();
  if (result.success) {
    const { token, ...rest } = result;
    setItem(token);
  }
  return result;
});

export const addToCartRequest = createAsyncThunk(
  "user/addToCartRequest",
  async (formData) => {
    const { userId, data } = formData;
    const response = await fetch(`${BASE_URL}/cart/${userId}`, {
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

export const addProdQuantity = createAsyncThunk(
  "user/addProdQuantity",
  async (formData) => {
    const { userId, data } = formData;
    const response = await fetch(`${BASE_URL}/addQuantity/${userId}`, {
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

export const subProdQuantity = createAsyncThunk(
  "user/addProdQuantity",
  async (formData) => {
    const { userId, data } = formData;
    const response = await fetch(`${BASE_URL}/subQuantity/${userId}`, {
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {
      success: null,
      user: {},
    },
    error: null,
    cartCount: 0,
  },
  reducers: {
    addQuantity: (state, action) => {
      const prod = state.user.user.cartItems.map((prod) =>
        prod.productId === action.payload ? (prod.quantity += 1) : prod
      );
    },
    subQuantity: (state, action) => {
      const prod = state.user.user.cartItems.map((prod) =>
        prod.productId === action.payload ? (prod.quantity -= 1) : prod
      );
    },
    addToCart: (state, action) => {
      state.cartCount += 1;
    },
    removeUserCart: (state, action) => {
      state.user.user.cartItems = state.user.user.cartItems.filter(
        (item) => item._id != action.payload
      );
      state.cartCount -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.user = {};
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.user = action.payload);
        if (action.payload.success) {
          state.cartCount = action.payload.user.cartItems?.length;
        }
      })
      .addCase(signin.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload.message),
          (state.user = {});
      })
      .addCase(addToCartRequest.fulfilled, (state, action) => {
        state.user.user.cartItems = action.payload.result;
      });
  },
});

export const userSelector = () => {
  return useSelector((state) => state.user);
};

export const isAddedinCart = (id) => {
  const { user } = userSelector();
  const result = user.user.cartItems.find((prod) => prod.productId === id);
  return result;
};

export const { addQuantity, subQuantity, addToCart, removeUserCart } =
  userSlice.actions;
export default userSlice.reducer;
