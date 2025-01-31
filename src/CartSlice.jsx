import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalQuantity++;
    },
    removeItem: (state, action) => {
      const name = action.payload;
      const itemIndex = state.items.findIndex((item) => item.name === name);

      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }

      if (state.totalQuantity == 0) {
        state.items = [];
        state.totalQuantity = 0;
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        existingItem.quantity = quantity;
      }

      if (quantity === 0) {
        state.items = state.items.filter((item) => item.name !== name);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
